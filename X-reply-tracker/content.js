// Content script for X.com reply tracking
(function () {
  "use strict";

  let isTracking = false;

  // Initialize tracking when page loads
  initializeTracking();

  // Re-initialize when navigating (SPA behavior)
  let currentUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(initializeTracking, 1000);
    }
  }).observe(document, { subtree: true, childList: true });

  function initializeTracking() {
    if (isTracking) return;
    isTracking = true;

    console.log("X Reply Tracker: Initializing...");

    // Track clicks on reply/post buttons
    document.addEventListener("click", handleClick, true);

    // Also observe for dynamically added buttons
    observeForButtons();
  }

  function handleClick(event) {
    const target = event.target;

    // Check if this is a reply/post button
    if (isReplyButton(target)) {
      console.log("X Reply Tracker: Reply button clicked");

      // Prevent double counting by marking this click
      if (target.hasAttribute("data-reply-counted")) {
        console.log("X Reply Tracker: Already counted this click");
        return;
      }

      // Mark this button as clicked
      target.setAttribute("data-reply-counted", "true");

      // Remove the marker after 2 seconds to allow future clicks
      setTimeout(() => {
        target.removeAttribute("data-reply-counted");
      }, 2000);

      // Add a small delay to ensure the tweet is posted
      setTimeout(() => {
        incrementReplyCount();
      }, 500);
    }
  }

  function isReplyButton(element) {
    // First check: Must be exactly the reply button with specific data-testid
    if (element.getAttribute("data-testid") === "tweetButtonInline") {
      // Additional validation: check if it contains "Reply" text
      const buttonText = element.textContent?.toLowerCase().trim() || "";
      if (buttonText.includes("reply")) {
        console.log("X Reply Tracker: Found reply button via data-testid");
        return true;
      }
    }

    // Check parent elements for the reply button
    const parentButton = element.closest('[data-testid="tweetButtonInline"]');
    if (parentButton) {
      const parentText = parentButton.textContent?.toLowerCase().trim() || "";
      if (parentText.includes("reply")) {
        // console.log(
        //   "X Reply Tracker: Found reply button via parent data-testid"
        // );
        return true;
      }
    }

    // Fallback: Check for specific reply button characteristics
    if (
      element.tagName === "BUTTON" ||
      element.getAttribute("role") === "button"
    ) {
      const buttonText = element.textContent?.toLowerCase().trim() || "";
      const ariaLabel = element.getAttribute("aria-label")?.toLowerCase() || "";

      // Only match if it specifically says "Reply" (not "Repost" or other actions)
      if (buttonText === "reply" || ariaLabel.includes("reply")) {
        console.log("X Reply Tracker: Found reply button via text/aria-label");
        return true;
      }
    }

    return false;
  }

  function observeForButtons() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if new reply buttons were added
            const replyButtons = node.querySelectorAll(
              '[data-testid="tweetButtonInline"], [data-testid="tweetButton"]'
            );
            replyButtons.forEach((button) => {
              if (!button.hasAttribute("data-reply-tracked")) {
                button.setAttribute("data-reply-tracked", "true");
                button.addEventListener("click", () => {
                  //   console.log("X Reply Tracker: New reply button clicked");
                  setTimeout(() => {
                    incrementReplyCount();
                  }, 500);
                });
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function incrementReplyCount() {
    // Check if extension context is still valid
    if (!chrome.runtime?.id) {
      console.log(
        "X Reply Tracker: Extension context invalidated, stopping tracking"
      );
      return;
    }

    const today = new Date().toDateString();
    const storageKey = `replies_${today}`;

    try {
      chrome.storage.sync.get([storageKey], function (data) {
        // Check for errors and context validity
        if (chrome.runtime.lastError) {
          console.log(
            "X Reply Tracker: Storage error:",
            chrome.runtime.lastError
          );
          return;
        }

        if (!chrome.runtime?.id) {
          console.log(
            "X Reply Tracker: Extension context lost during storage operation"
          );
          return;
        }

        const currentCount = data[storageKey] || 0;
        const newCount = currentCount + 1;

        chrome.storage.sync.set(
          {
            [storageKey]: newCount,
          },
          function () {
            if (chrome.runtime.lastError) {
              console.log(
                "X Reply Tracker: Storage set error:",
                chrome.runtime.lastError
              );
              return;
            }

            if (!chrome.runtime?.id) {
              console.log(
                "X Reply Tracker: Extension context lost during storage set"
              );
              return;
            }

            // console.log(`X Reply Tracker: Reply count updated to ${newCount}`);

            // Show notification on page
            showNotification(newCount);

            // Try to notify popup, but handle errors gracefully
            try {
              chrome.runtime
                .sendMessage({
                  action: "updatePopup",
                })
                .catch(() => {
                  // Silently handle case where popup isn't open
                });
            } catch (error) {
              // Extension context might be invalid, ignore
            }
          }
        );
      });
    } catch (error) {
      console.log("X Reply Tracker: Error in incrementReplyCount:", error);
    }
  }

  function showNotification(count) {
    // Check if overlay is active
    const overlay = document.getElementById("x-reply-tracker-overlay");

    if (overlay) {
      // If overlay exists, animate the counter instead of showing toast
      animateOverlayCounter(count);
    } else {
      // If no overlay, show the regular toast notification
      showToastNotification(count);
    }
  }

  function animateOverlayCounter(count) {
    const currentEl = document.getElementById("overlay-current");
    if (currentEl) {
      // Add a brief highlight animation
      currentEl.style.transition = "all 0.3s ease";
      currentEl.style.transform = "scale(1.2)";
      currentEl.style.color = "#1d9bf0";
      currentEl.style.fontWeight = "bold";

      // Update the text
      currentEl.textContent = count;

      // Reset after animation
      setTimeout(() => {
        currentEl.style.transform = "scale(1)";
        currentEl.style.color = "#71767b";
        currentEl.style.fontWeight = "normal";
      }, 300);

      // Also animate the progress bar
      const progressEl = document.getElementById("overlay-progress");
      if (progressEl) {
        progressEl.style.transition = "all 0.5s ease";
        // The progress will be updated by the regular overlay update cycle
      }
    }
  }

  function showToastNotification(count) {
    // Create temporary notification (only when overlay is not visible)
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1d9bf0;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

    notification.textContent = `Replies today: ${count}`;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-10px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
})();
