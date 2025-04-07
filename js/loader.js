/**
 * Global Page Loader Module
 * Provides a consistent loading experience across all pages
 */
const loaderModule = (function() {
    // DOM elements
    let loaderWrapper;
    
    /**
     * Initialize the loader
     */
    function init() {
        loaderWrapper = document.getElementById('loader-wrapper');
        
        // Show loader immediately
        show();
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', hide);
        
        // Fallback timer to hide loader after 2 seconds
        // This ensures the loader will hide even if some resources fail to load
        setTimeout(hide, 2000);
    }
    
    /**
     * Show the loader
     */
    function show() {
        if (loaderWrapper) {
            loaderWrapper.classList.remove('hidden');
        }
    }
    
    /**
     * Hide the loader
     */
    function hide() {
        if (loaderWrapper) {
            loaderWrapper.classList.add('hidden');
        }
    }
    
    // Public API
    return {
        init: init,
        show: show,
        hide: hide
    };
})();

// Initialize loader when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    loaderModule.init();
});

// Expose loader module globally
window.loaderModule = loaderModule;
