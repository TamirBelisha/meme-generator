'use strict';
var gElCanvas;
var gCtx;
var gStartPos;
var gIsDrag = false;

function initMeme() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListeners();
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
            if (!line.pos) {
                gCtx.fillText(line.txt, 50, 50);
                line.pos = { x: 50, y: 50, xLength: txt.width }
                if (idx === meme.selectedLineIdx) drawFocus(50, 50, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, 50, 50);
            } else {
                gCtx.fillText(line.txt, line.pos.x, line.pos.y);
                if (idx === meme.selectedLineIdx) drawFocus(line.pos.x, line.pos.y, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
            }
        } else if (idx === 1) {
            if (!line.pos) {
                gCtx.fillText(line.txt, 50, 450);
                line.pos = { x: 50, y: 450, xLength: txt.width }
                if (idx === meme.selectedLineIdx) drawFocus(50, 450, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, 50, 450);
            } else {
                gCtx.fillText(line.txt, line.pos.x, line.pos.y);
                if (idx === meme.selectedLineIdx) drawFocus(line.pos.x, line.pos.y, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
            }
        } else {
            if (!line.pos) {
                gCtx.fillText(line.txt, 50, 250);
                line.pos = { x: 50, y: 250, xLength: txt.width }
                if (idx === meme.selectedLineIdx) drawFocus(50, 250, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, 50, 250);
            } else {
                gCtx.fillText(line.txt, line.pos.x, line.pos.y);
                if (idx === meme.selectedLineIdx) drawFocus(line.pos.x, line.pos.y, txt.width, line.size)
                if (line.isStroke) gCtx.strokeText(line.txt, line.pos.x, line.pos.y);

            }
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


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    gIsDrag = true;
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gIsDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    gIsDrag = false;
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}