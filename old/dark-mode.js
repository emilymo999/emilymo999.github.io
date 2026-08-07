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

// Dark mode toggle is currently hidden — clear any saved state
document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('darkMode');
    document.body.classList.remove('dark-mode');
});

