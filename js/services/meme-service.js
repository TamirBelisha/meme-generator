'use strict';
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        font: 'Impact',
        txt: 'MEME GENERATOR',
        size: 40,
        align: 'left',
        color: 'white',
        isStroke: true
    }]
};

function createLine(txt) {
    return {
        font: 'Impact',
        txt,
        size: 40,
        align: 'left',
        color: 'white',
        isStroke: true
    }
}

function getMeme() {
    return gMeme;
}

function getMemeImgs() {
    return gImgs;
}

function setFontFamily() {
    gMeme.lines[gMeme.selectedLineIdx].font = document.getElementById('font-fam').value;
    renderMeme();
}

function setLineTxt(txt) {
    if (gMeme.lines.length < gMeme.selectedLineIdx) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    renderMeme();
}

function setImg(id) {
    gMeme.selectedImgId = id;
    renderMeme();
}

function setColor() {
    gMeme.lines[gMeme.selectedLineIdx].color = document.getElementById('txt-color').value;
    renderMeme();
}

function resizeFont(key) {
    gMeme.lines[gMeme.selectedLineIdx].size += (key === 'increase') ? 2 : -2;
    renderMeme();
}

function changeLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    renderMeme();
}

function addLine(txt) {
    gMeme.lines.push(createLine('TEXT'));
    changeLine();
    renderMeme();
}

function setStroke() {
    gMeme.lines[gMeme.selectedLineIdx].isStroke = !gMeme.lines[gMeme.selectedLineIdx].isStroke;
    renderMeme();
}

function setAlign(key) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = key;
    switch (key) {
        case 'left':
            currLine.pos.x = 0;
            break;
        case 'center':
            currLine.pos.x = 120;
            break;
        case 'right':
            currLine.pos.x = 270;
            break;
        default:
            break;
    }
    renderMeme();
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderMeme();
}



function isLineClicked(pos) {
    var isTrue = false;
    gMeme.lines.forEach((line, idx) => {
        if (pos.x > line.pos.x && pos.x < (line.pos.x + line.pos.xLength) && pos.y > line.pos.y && pos.y < (line.pos.y + line.size)) {
            gMeme.selectedLineIdx = idx;
            renderMeme();
            isTrue = true;
        }
    })
    return isTrue;
}


function moveLine(dx, dy) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.pos.x += dx;
    currLine.pos.y += dy;
}

function clearFocus() {
    gMeme.selectedLineIdx = 100;
    renderMeme();
}