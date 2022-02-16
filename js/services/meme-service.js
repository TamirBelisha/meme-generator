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
        },
        createLine('makore Ya ami')
    ]
}

function createLine(txt) {
    return {
        txt,
        size: 20,
        align: 'left',
        color: 'white'
    }
}

function getMeme() {
    return gMeme;
}

function getMemeImgs() {
    return gImgs;
}

function setFontFamily() {
    gMeme.lines[0].font = document.getElementById('font-fam').value
    renderMeme();
}

function setLineTxt() {
    gMeme.lines[0].txt = document.querySelector('.txt-input').value;
    renderMeme();
}

function setImg(id) {
    gMeme.selectedImgId = id;
    renderMeme();
}

function setColor() {
    gMeme.lines[gMeme.selectedLineIdx].color = document.querySelector('.txt-color').value;
    renderMeme();
}

function resizeFont(key) {
    gMeme.lines[gMeme.selectedLineIdx].size += (key === 'increase') ? 2 : -2;
    renderMeme();
}