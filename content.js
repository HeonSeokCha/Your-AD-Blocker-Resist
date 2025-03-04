const modalClass = '.fc-ab-root';

function hideModal() {
    const modal = document.querySelector(modalClass);
    if (!modal) return;

    modal.remove();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    chrome.runtime.sendMessage('adblock')
}

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            hideModal();
            break;
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});