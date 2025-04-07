/**
 * Theme Switch Functionality
 * Handles switching between light and dark themes
 */
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on page load
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
        updateThemeIcon(true);
    }
    
    // Handle theme switch toggle
    themeSwitch.addEventListener('change', function() {
        toggleTheme(this.checked);
    });
    
    // Handle mobile theme icon click
    if (themeIcon) {
        themeIcon.addEventListener('click', function() {
            const isLightTheme = !document.body.classList.contains('light-theme');
            toggleTheme(isLightTheme);
            themeSwitch.checked = isLightTheme;
        });
    }
    
    // Toggle theme function
    function toggleTheme(isLightTheme) {
        if (isLightTheme) {
            // Switch to light theme
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        
        updateThemeIcon(isLightTheme);
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(isLightTheme) {
        if (!themeIcon) return;
        
        const iconElement = themeIcon.querySelector('i');
        if (iconElement) {
            if (isLightTheme) {
                iconElement.className = 'fas fa-sun';
            } else {
                iconElement.className = 'fas fa-moon';
            }
        }
    }
});
