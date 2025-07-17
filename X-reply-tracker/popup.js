document.addEventListener('DOMContentLoaded', function() {
    const targetInput = document.getElementById('targetInput');
    const setTargetBtn = document.getElementById('setTargetBtn');
    const currentRepliesEl = document.getElementById('currentReplies');
    const targetRepliesEl = document.getElementById('targetReplies');
    const progressFill = document.getElementById('progressFill');
    const resetBtn = document.getElementById('resetBtn');
    const dateDisplay = document.getElementById('dateDisplay');
    const successMessage = document.getElementById('successMessage');
    const stayActiveToggle = document.getElementById('stayActiveToggle');
    
    let stayActiveEnabled = false;
    
    // Display current date
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateDisplay.textContent = today;
    
    // Load and display current data
    loadData();
    loadToggleState();
    
    // Stay active toggle handler
    stayActiveToggle.addEventListener('click', function() {
        stayActiveEnabled = !stayActiveEnabled;
        updateToggleUI();
        
        chrome.storage.sync.set({
            stayActiveEnabled: stayActiveEnabled
        });
        
        if (stayActiveEnabled) {
            // Inject overlay into the current tab
            injectOverlay();
        } else {
            // Remove overlay from the current tab
            removeOverlay();
        }
    });
    
    // Set target button click handler
    setTargetBtn.addEventListener('click', function() {
        const target = parseInt(targetInput.value);
        if (target && target > 0) {
            chrome.storage.sync.set({
                dailyTarget: target
            }, function() {
                targetInput.value = '';
                loadData();
            });
        }
    });
    
    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        const today = new Date().toDateString();
        chrome.storage.sync.set({
            [`replies_${today}`]: 0
        }, function() {
            loadData();
        });
    });
    
    // Load data from storage and update UI
    function loadData() {
        // Check if extension context is still valid
        if (!chrome.runtime?.id) {
            console.log('Popup: Extension context invalidated');
            return;
        }
        
        const today = new Date().toDateString();
        
        try {
            chrome.storage.sync.get(['dailyTarget', `replies_${today}`], function(data) {
                if (chrome.runtime.lastError) {
                    console.log('Popup: Storage error:', chrome.runtime.lastError);
                    return;
                }
                
                if (!chrome.runtime?.id) {
                    console.log('Popup: Extension context lost during storage operation');
                    return;
                }
                
                const target = data.dailyTarget || 0;
                const replies = data[`replies_${today}`] || 0;
                
                // Update UI
                currentRepliesEl.textContent = replies;
                targetRepliesEl.textContent = target > 0 ? `/ ${target}` : 'No target set';
                
                // Update progress bar
                if (target > 0) {
                    const progress = Math.min((replies / target) * 100, 100);
                    progressFill.style.width = progress + '%';
                    
                    // Show success message if target is reached
                    if (replies >= target && replies > 0) {
                        successMessage.textContent = `🎉 Target achieved! You've made ${replies} replies today!`;
                        successMessage.style.display = 'block';
                    } else {
                        successMessage.style.display = 'none';
                    }
                } else {
                    progressFill.style.width = '0%';
                    successMessage.style.display = 'none';
                }
            });
        } catch (error) {
            console.log('Popup: Error loading data:', error);
        }
    }
    
    // Listen for updates from content script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === 'updatePopup') {
            loadData();
        }
    });
    
    // Load toggle state
    function loadToggleState() {
        chrome.storage.sync.get(['stayActiveEnabled'], function(data) {
            stayActiveEnabled = data.stayActiveEnabled || false;
            updateToggleUI();
            
            if (stayActiveEnabled) {
                injectOverlay();
            }
        });
    }
    
    // Update toggle UI
    function updateToggleUI() {
        if (stayActiveEnabled) {
            stayActiveToggle.classList.add('active');
        } else {
            stayActiveToggle.classList.remove('active');
        }
    }
    
    // Listen for storage changes to sync toggle state
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.stayActiveEnabled) {
            stayActiveEnabled = changes.stayActiveEnabled.newValue;
            updateToggleUI();
        }
    });
    
    // Inject overlay into the page
    function injectOverlay() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: createOverlay
            });
        });
    }
    
    // Remove overlay from the page
    function removeOverlay() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: removeOverlayFromPage
            });
        });
    }
    
    // Function to be injected into the page
    function createOverlay() {
        // Remove existing overlay if any
        const existingOverlay = document.getElementById('x-reply-tracker-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.id = 'x-reply-tracker-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: #000;
            color: #fff;
            border: 1px solid #2f3336;
            border-radius: 24px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            padding: 10px;
        `;
        
        // Create content
        overlay.innerHTML = `
            <div style="background: #16181c; padding: 15px; border-radius: 16px; border: 1px solid #2f3336;">
                <h2 style="font-size: 14px; margin: 0 0 10px 0; color: #e7e9ea;">Today's Progress</h2>
                <div style="background: #2f3336; height: 8px; border-radius: 4px; overflow: hidden; margin: 10px 0;">
                    <div style="height: 100%; background: #1d9bf0; transition: width 0.3s ease;" id="overlay-progress"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #71767b;">
                    <span id="overlay-current">0</span>
                    <span id="overlay-target">No target set</span>
                </div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(overlay);
        
        // Load and display current data
        loadOverlayData();
        
        // Update overlay data every 2 seconds with error handling
        const updateInterval = setInterval(() => {
            if (!chrome.runtime?.id) {
                console.log('Overlay: Extension context invalidated, stopping interval');
                clearInterval(updateInterval);
                return;
            }
            
            // Check if overlay still exists
            if (!document.getElementById('x-reply-tracker-overlay')) {
                console.log('Overlay: Element removed, stopping interval');
                clearInterval(updateInterval);
                return;
            }
            
            loadOverlayData();
        }, 2000);
        
        function loadOverlayData() {
            // Check if extension context is still valid
            if (!chrome.runtime?.id) {
                console.log('Overlay: Extension context invalidated, stopping updates');
                return;
            }
            
            const today = new Date().toDateString();
            
            try {
                chrome.storage.sync.get(['dailyTarget', `replies_${today}`], function(data) {
                    if (chrome.runtime.lastError) {
                        console.log('Overlay: Storage error:', chrome.runtime.lastError);
                        return;
                    }
                    
                    if (!chrome.runtime?.id) {
                        console.log('Overlay: Extension context lost during storage operation');
                        return;
                    }
                    
                    const target = data.dailyTarget || 0;
                    const replies = data[`replies_${today}`] || 0;
                    
                    // Update progress - check if elements still exist
                    const currentEl = document.getElementById('overlay-current');
                    const targetEl = document.getElementById('overlay-target');
                    const progressEl = document.getElementById('overlay-progress');
                    
                    if (currentEl) currentEl.textContent = replies;
                    if (targetEl) targetEl.textContent = target > 0 ? `/ ${target}` : 'No target set';
                    
                    if (progressEl && target > 0) {
                        const progress = Math.min((replies / target) * 100, 100);
                        progressEl.style.width = progress + '%';
                    }
                });
            } catch (error) {
                console.log('Overlay: Error loading data:', error);
            }
        }
    }
    
    // Function to remove overlay from page
    function removeOverlayFromPage() {
        const overlay = document.getElementById('x-reply-tracker-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
});