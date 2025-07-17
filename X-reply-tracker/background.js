// Background script for X Reply Target Tracker
chrome.runtime.onInstalled.addListener(() => {
    console.log('X Reply Target Tracker installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updatePopup') {
        // Only forward if there's actually a popup to receive it
        // This prevents the "Receiving end does not exist" error
        try {
            chrome.runtime.sendMessage(message).catch(() => {
                // Silently handle case where popup isn't open
                // This is normal behavior and not an error
            });
        } catch (error) {
            // Popup not open, which is normal
        }
    }
    // Always send response to prevent hanging
    sendResponse({received: true});
});

// Clean up old data periodically (keeps only last 7 days)
// This runs locally and never sends data anywhere
function cleanupOldData() {
    chrome.storage.sync.get(null, (data) => {
        if (chrome.runtime.lastError) {
            console.log('Storage access error:', chrome.runtime.lastError);
            return;
        }
        
        const today = new Date();
        const keysToRemove = [];
        
        Object.keys(data).forEach(key => {
            if (key.startsWith('replies_')) {
                const dateStr = key.replace('replies_', '');
                const date = new Date(dateStr);
                const daysDiff = (today - date) / (1000 * 60 * 60 * 24);
                
                // Keep only last 7 days of data
                if (daysDiff > 7) {
                    keysToRemove.push(key);
                }
            }
        });
        
        if (keysToRemove.length > 0) {
            chrome.storage.sync.remove(keysToRemove, () => {
                if (chrome.runtime.lastError) {
                    console.log('Cleanup error:', chrome.runtime.lastError);
                } else {
                    console.log('Cleaned up old data:', keysToRemove.length, 'entries');
                }
            });
        }
    });
}

// Run cleanup on install and periodically
chrome.runtime.onInstalled.addListener(cleanupOldData);

// PRIVACY NOTE: This extension:
// - Stores data ONLY locally using Chrome's sync storage
// - Never sends data to external servers
// - Never makes network requests
// - Only tracks clicks on X.com locally
// - Data stays on your device and Chrome account sync only