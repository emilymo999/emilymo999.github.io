const PROFESSIONAL_PHOTO = 'images/emo-black.jpeg';
const COLOR_PHOTO = 'images/emo-casual-bag.png';
const PROFESSIONAL_LOGO = 'images/browserimage dark.png';
const COLOR_LOGO = 'images/browserimage.png';

function swapLogo(src) {
    const logo = document.getElementById('top-bar-logo');
    if (logo) logo.src = src;
}

function animateBolds(isColor) {
    document.querySelectorAll('strong').forEach(function (el, i) {
        setTimeout(function () {
            el.classList.toggle('bold-colored', isColor);
        }, i * 70);
    });
}

function toggleColorMode() {
    const body = document.body;
    const isColor = body.classList.toggle('color-mode');
    const btn = document.getElementById('color-mode-btn');

    btn.textContent = isColor ? '← back' : 'add some color';

    const photo = document.querySelector('img.casual-photo');
    if (photo) {
        photo.style.transition = 'opacity 0.35s ease';
        photo.style.opacity = '0';
        setTimeout(function () {
            photo.src = isColor ? COLOR_PHOTO : PROFESSIONAL_PHOTO;
            photo.style.opacity = '1';
        }, 350);
    }

    animateBolds(isColor);
    swapLogo(isColor ? COLOR_LOGO : PROFESSIONAL_LOGO);
    localStorage.setItem('colorMode', isColor);
}

document.addEventListener('DOMContentLoaded', function () {
    const isColor = localStorage.getItem('colorMode') === 'true';
    const btn = document.getElementById('color-mode-btn');

    if (isColor) {
        document.body.classList.add('color-mode');
        if (btn) btn.textContent = '← back';
        swapLogo(COLOR_LOGO);
        const photo = document.querySelector('img.casual-photo');
        if (photo) photo.src = COLOR_PHOTO;
        document.querySelectorAll('strong').forEach(function (el) {
            el.classList.add('bold-colored');
        });
    }
});
