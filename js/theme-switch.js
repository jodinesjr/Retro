/**
 * Theme Switch Functionality
 * Handles switching between light and dark themes
 */
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('themeSwitch');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on page load
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    }
    
    // Handle theme switch toggle
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            // Switch to light theme
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
});
