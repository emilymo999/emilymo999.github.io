// Dark mode functionality
function toggleDarkMode() {
    const checkbox = event.target;
    const body = document.body;
    const isDarkMode = checkbox.checked;
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// Load saved preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    const checkbox = document.querySelector('.dark-mode-toggle input[type="checkbox"]');
    
    if (savedDarkMode) {
        body.classList.add('dark-mode');
        if (checkbox) {
            checkbox.checked = true;
        }
    }
});

