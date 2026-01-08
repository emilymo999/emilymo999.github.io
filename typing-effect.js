// Typing effect for the heading
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    const textToType = " hi! i'm emily mo.";
    let index = 0;
    
    function typeText() {
        if (index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, 80); // Adjust speed here (milliseconds per character)
        } else {
            // Hide cursor after typing is complete
            if (cursorElement) {
                cursorElement.style.display = 'none';
            }
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 300);
});

