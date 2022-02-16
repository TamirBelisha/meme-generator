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


function drawText() {
    const meme = getMeme();
    const lines = meme.lines;
    gCtx.textBaseline = 'top';
    lines.forEach((line, idx) => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        var txt = gCtx.measureText(line.txt)
        if (idx === 0) {
            gCtx.fillText(line.txt, 50, 50);
            if (idx === meme.selectedLineIdx) drawFocus(50, 50, txt.width, line.size)
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 50);
        } else if (idx === 1) {
            gCtx.fillText(line.txt, 50, 450);
            if (idx === meme.selectedLineIdx) drawFocus(50, 450, txt.width, line.size)
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 450);
        } else {
            gCtx.fillText(line.txt, 50, 250);
            if (idx === meme.selectedLineIdx) drawFocus(50, 250, txt.width, line.size)
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 250);
        }
    })
}

function drawFocus(x, y, xLength, yLength) {
    gCtx.beginPath();
    gCtx.rect(x, y, xLength, yLength);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.closePath();
}

function drawImg(src) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText()
    };
    img.src = src;
}

function onSetFontFamily() {
    setFontFamily();
}

function onSetLineTxt() {
    var txt = document.querySelector('.txt-input').value;
    setLineTxt(txt);
}

function onSetColor() {
    setColor();
}

function onResizeFont(key) {
    resizeFont(key);
}

function onChangeLine() {
    changeLine();
}

function onAddLine() {
    var txt = document.querySelector('.txt-input').value;
    if (!txt) return;
    document.querySelector('.txt-input').value = '';
    addLine(txt);
}

function onSetStroke() {
    setStroke();
}

function onDeleteLine() {
    deleteLine();
}