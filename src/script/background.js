let map = new Map();

chrome.runtime.onMessage.addListener(message => {
    if (message === 'adblock') {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let tabId = tabs[0].id;
            if (map.has(tabId)) {
                map.set(tabId, map.get(tabId) + 1)
            } else {
                map.set(tabId, 1)
            }

            chrome.action.setBadgeText({
                tabId: tabId,
                text: map.get(tabId).toString()
            });
        });
    }
});

chrome.tabs.onActivated.addListener((tab) => {
    console.log(tab)
    if (map.has(tab.tabId)) {
        chrome.action.setBadgeText({
            tabId: tab.tabId,
            text: map.get(tab.tabId).toString()
        });
    } else {
        chrome.action.setBadgeText({
            tabId: tab.tabId,
            text: ''
        });
    }
});