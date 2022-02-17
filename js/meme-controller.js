'use strict';
var gElCanvas;
var gCtx;
var gStartPos;
var gIsDrag = false;

function initMeme() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListeners();
    resetMeme();
}

function renderMeme() {
    renderStickers();
    const meme = getMeme();
    const images = getMemeImgs();
    drawImg(images[(meme.selectedImgId - 1)].url);
    gElCanvas.style.cursor = 'grab'
}


function drawText() {
    const meme = getMeme();
    const lines = meme.lines;
    gCtx.textBaseline = 'top';
    lines.forEach((line, idx) => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        var txt = gCtx.measureText(line.txt)
        if (line.type === 'sticker' && !line.pos) {
            gCtx.fillText(line.txt, 250, 250);
            line.pos = { x: 250, y: 250 };
            gCtx.strokeText(line.txt, 250, 250);
        } else if (!line.pos && idx === 0) {
            gCtx.fillText(line.txt, 50, 50);
            line.pos = { x: 50, y: 50 };
            gCtx.strokeText(line.txt, 50, 50);
        } else if (!line.pos && idx === 1) {
            gCtx.fillText(line.txt, 50, 450);
            line.pos = { x: 50, y: 450 };
            gCtx.strokeText(line.txt, 50, 450);
        } else if (!line.pos) {
            gCtx.fillText(line.txt, 50, 250);
            line.pos = { x: 50, y: 250 };
            gCtx.strokeText(line.txt, 50, 250);
        }
        line.pos.xLength = txt.width;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
        if (idx === meme.selectedLineIdx) drawFocus(line.pos.x, line.pos.y, txt.width, line.size)
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

function onSetRandomMeme() {
    setRandomMeme();
}

function onSetAlign(key) {
    setAlign(key);
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
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderMeme()
    // })
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isLineClicked(pos)) {
        clearFocus();
        return;
    }
    gIsDrag = true;
    gStartPos = pos;
    gElCanvas.style.cursor = 'grabbing';

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
    gElCanvas.style.cursor = 'grab'
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

function resizeCanvas() {
    var elContainer = document.querySelector('.meme-editor');
    gElCanvas.width = elContainer.offsetWidth / 2
        // gCanvas.height = elContainer.offsetHeight
}

function handleShare(el) {
    var val = el.value;
    switch (val) {
        case 'Download':
            downloadCanvas();
            break;
        case 'Share':
            uploadImg();
            break;
        case 'Save':
            uploadImg('Save');
        default:
            break;
    }
}

function downloadCanvas() {
    document.querySelector('.links-container').innerHTML = `
    <a href="#" download="myphoto" class="links flex align-center"></a>`
    const data = gElCanvas.toDataURL();
    var elLink = document.querySelector('.links')
    elLink.href = data;
    elLink.download = 'My-Canvas';
    elLink.innerText = 'Download';
}

function uploadImg(key) {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        if (key === 'Save') {
            document.querySelector('.links-container').innerHTML = `<a href="${uploadedImgUrl}">Saved!</a>`
            saveMemeUrl(imgDataUrl);
        } else document.querySelector('.links-container').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}