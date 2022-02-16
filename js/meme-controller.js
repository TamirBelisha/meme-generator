'use strict';
var gElCanvas;
var gCtx;

function initMeme() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function renderMeme() {
    const meme = getMeme();
    const images = getMemeImgs();
    drawImg(images[(meme.selectedImgId - 1)].url);
}


function drawText(x, y) {
    const meme = getMeme();
    const line = meme.lines[meme.selectedLineIdx];
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, x, y);
    if (line.isStroke) gCtx.strokeText(line.txt, x, y);
}

function drawImg(src) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(100, 100)
    };
    img.src = src;
}

function onSetFontFamily() {
    setFontFamily();
}

function onSetLineTxt() {
    setLineTxt();
}

function onSetColor() {
    setColor();
}

function onResizeFont(key) {
    resizeFont(key);
}