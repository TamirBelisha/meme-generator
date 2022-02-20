'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gElCanvas;
var gCtx;
var gStartPos;
var gIsDrag = false;


function initMeme() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListeners();
    addTouchListeners();
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
    const canvasHeight = gElCanvas.height
    const canvasWidth = gElCanvas.width
    gCtx.textBaseline = 'top';
    lines.forEach((line, idx) => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        var measuredText = gCtx.measureText(line.txt)
        if (measuredText.width > (canvasWidth - 50)) {
            line.size *= 0.8
            gCtx.font = `${line.size}px ${line.font}`;
        }
        if (line.type === 'sticker' && !line.pos) {
            gCtx.fillText(line.txt, (canvasWidth / 2), (canvasHeight / 2));
            line.pos = { x: (canvasWidth / 2), y: (canvasHeight / 2) };
            gCtx.strokeText(line.txt, (canvasWidth / 2), (canvasHeight / 2));
        } else if (!line.pos && idx === 0) {
            gCtx.fillText(line.txt, 50, 50);
            line.pos = { x: 50, y: 50 };
            gCtx.strokeText(line.txt, 50, 50);
        } else if (!line.pos && idx === 1) {
            gCtx.fillText(line.txt, 50, (canvasHeight - 50));
            line.pos = { x: 50, y: (canvasHeight - 50) };
            gCtx.strokeText(line.txt, 50, (canvasHeight - 50));
        } else if (!line.pos) {
            gCtx.fillText(line.txt, 50, (canvasHeight / 2));
            line.pos = { x: 50, y: (canvasHeight / 2) };
            gCtx.strokeText(line.txt, 50, (canvasHeight / 2));
        }
        line.pos.xLength = measuredText.width;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
        if (idx === meme.selectedLineIdx) drawFocus(line.pos.x, line.pos.y, measuredText.width, line.size)
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
    var screenWidth = window.innerWidth;
    var maxWidth = (screenWidth > 860) ? (screenWidth / 2.2) : (screenWidth - 100)
    console.log('maxWidth', maxWidth);
    console.log('screenWidth', screenWidth);
    img.onload = () => {
        var canvasHeight = (img.height * maxWidth) / img.width;
        console.log('canvasHeight', canvasHeight);
        console.log('img.width', img.width);
        console.log('img.height', img.height);
        if (canvasHeight > 485 && screenWidth > 860) {
            console.log('imHererererererere');
            maxWidth = (screenWidth / 3)
            canvasHeight = (img.height * maxWidth) / img.width;
            if ((img.height >= img.width)) {
                canvasHeight = 485
                maxWidth = (img.height * canvasHeight) / img.width;
            }
        }
        gElCanvas.width = maxWidth;
        gElCanvas.height = canvasHeight;
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
    window.addEventListener('resize', renderMeme)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    ev.preventDefault();
    const pos = getEvPos(ev);
    if (!isLineClicked(pos, ev)) {
        var res = document.getElementById('txt-input');
        res.blur();
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

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
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
    elLink.innerText = (getCurrLang() === 'en') ? 'Download' : 'הורד';
}

function uploadImg(key) {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    var txt = (getCurrLang() === 'en') ? 'Share' : 'שתף';
    var txt2 = (getCurrLang() === 'en') ? 'Saved!' : 'נשמר!';

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        if (key === 'Save') {
            document.querySelector('.links-container').innerHTML = `<a href="${uploadedImgUrl}">${txt2}</a>`
            saveMemeUrl(imgDataUrl);
        } else document.querySelector('.links-container').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           ${txt}   
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
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onImgInput(ev) {
    loadImageFromInput(ev, drawImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.src = event.target.result
        createImgObject(img.src)
        img.onload = onImageReady.bind(null, img.src)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}