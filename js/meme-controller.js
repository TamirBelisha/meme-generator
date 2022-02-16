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
    lines.forEach((line) => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        if (line === lines[0]) {
            gCtx.fillText(line.txt, 50, 50);
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 50);
        } else if (line === lines[1]) {
            gCtx.fillText(line.txt, 50, 450);
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 450);
        } else {
            gCtx.fillText(line.txt, 50, 250);
            if (line.isStroke) gCtx.strokeText(line.txt, 50, 250);
        }
    })
}

function drawFocus() {
    var x;
    var y;
    var xLength;
    var yLength;
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (meme.selectedLineIdx === 0) {
        x = 25
        y = 25
        xLength = (line.txt.length + 25)
        yLength = (line.size + 25)
    }
    gCtx.beginPath();
    gCtx.rect(x, y, xLength, yLength);
    gCtx.fillStyle = 'orange';
    gCtx.fillRect(x, y, xLength, yLength);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
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
    setLineTxt();
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