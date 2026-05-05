const PROFESSIONAL_PHOTO = 'images/emo-black.jpeg';
const COLOR_PHOTO = 'images/emo-casual-bag.png';
const PROFESSIONAL_LOGO = 'images/browserimage dark.png';
const COLOR_LOGO = 'images/browserimage.png';

function swapLogo(src) {
    const logo = document.getElementById('top-bar-logo');
    if (logo) logo.src = src;
}

function toggleColorMode() {
    const body = document.body;
    const isColor = body.classList.toggle('color-mode');
    const btn = document.getElementById('color-mode-btn');

    btn.textContent = isColor ? '← back' : 'add some color';
    window.swapCasualPhoto && window.swapCasualPhoto(isColor ? COLOR_PHOTO : PROFESSIONAL_PHOTO);
    swapLogo(isColor ? COLOR_LOGO : PROFESSIONAL_LOGO);
    localStorage.setItem('colorMode', isColor);
}

document.addEventListener('DOMContentLoaded', function () {
    const isColor = localStorage.getItem('colorMode') === 'true';
    const btn = document.getElementById('color-mode-btn');

    if (isColor) {
        document.body.classList.add('color-mode');
        btn.textContent = '← back';
        swapLogo(COLOR_LOGO);
    }
});
