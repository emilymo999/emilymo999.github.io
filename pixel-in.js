window.addEventListener('DOMContentLoaded', function () {
    const img = document.querySelector('img.casual-photo');
    if (!img) return;

    const DURATION = 1600;
    const MAX_BLOCK = 6;
    const dpr = window.devicePixelRatio || 1;

    const fullImg = new Image();
    fullImg.onload = function () {
        const displayW = 300;
        const displayH = Math.round(fullImg.naturalHeight * displayW / fullImg.naturalWidth);

        const canvas = document.createElement('canvas');
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        canvas.style.cssText = 'width:' + displayW + 'px;height:' + displayH + 'px;border-radius:8px;flex-shrink:0;';

        img.replaceWith(canvas);
        window.__casualPhotoCanvas = canvas;
        window.__casualPhotoDisplayW = displayW;
        window.__casualPhotoDisplayH = displayH;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        const offscreen = document.createElement('canvas');
        const start = performance.now();

        function frame(now) {
            const t = Math.min((now - start) / DURATION, 1);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const blockSize = Math.max(1, Math.round(MAX_BLOCK * (1 - ease)));

            const w = Math.max(1, Math.ceil(displayW / blockSize));
            const h = Math.max(1, Math.ceil(displayH / blockSize));

            offscreen.width = w;
            offscreen.height = h;
            offscreen.getContext('2d').drawImage(fullImg, 0, 0, w, h);

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(offscreen, 0, 0, displayW, displayH);

            const blurPx = (1 - ease) * 3;
            canvas.style.filter = blurPx > 0.05 ? 'blur(' + blurPx.toFixed(2) + 'px)' : '';

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                ctx.imageSmoothingEnabled = true;
                ctx.clearRect(0, 0, displayW, displayH);
                ctx.drawImage(fullImg, 0, 0, displayW, displayH);
                canvas.style.filter = '';
            }
        }

        requestAnimationFrame(frame);
    };
    fullImg.src = img.src;
});

window.swapCasualPhoto = function (src) {
    const canvas = window.__casualPhotoCanvas;
    if (!canvas) return;
    const displayW = window.__casualPhotoDisplayW;
    const displayH = window.__casualPhotoDisplayH;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.transition = 'opacity 0.4s ease';
    canvas.style.opacity = '0';

    setTimeout(function () {
        const newImg = new Image();
        newImg.onload = function () {
            const newH = Math.round(newImg.naturalHeight * displayW / newImg.naturalWidth);
            canvas.height = newH * dpr;
            canvas.style.height = newH + 'px';
            window.__casualPhotoDisplayH = newH;

            const ctx = canvas.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.clearRect(0, 0, displayW, newH);
            ctx.drawImage(newImg, 0, 0, displayW, newH);
            canvas.style.opacity = '1';
        };
        newImg.src = src;
    }, 400);
};
