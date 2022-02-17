'use strict';
const STORAGE_KEY = 'memesDB';
const gStickerPageSize = 5;
var gStickers = ['👙', '👓', '👚', '💍', '👑', '👛', '👜', '👝', '🎒', '👞', '👟', '💼', '👒', '🎩', '🎓']
var gStickerPageIdx = 0;
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politician', 'angry', 'trump', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute', 'love', 'funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby', 'sleep', 'funny', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'Computer', 'sleep', 'funny', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'funny', 'victory', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'history', 'explain', 'smile'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'surprise', 'smile'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'listen', 'judge', 'surprise', 'smile'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby', 'Laughing', 'smile'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'smile', 'politician', 'obama'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'sports', 'gay', 'fighting', 'angry'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'you', 'judge', 'guilty'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cheers', 'actor', 'invite', 'you'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'surprise', 'serious', 'glasses', 'judge'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'explain'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'smile', 'crying', 'surprise'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'putin', 'serious', 'politician', 'angry', 'threat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toy', 'children', 'look', 'surprise', 'explain'] },
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
        stroke: 'black'
    }]
};

function createLine(txt, font = 'Impact', size = 40, align = 'left', color = 'white', stroke = 'black') {
    return {
        txt,
        font,
        size,
        align,
        color,
        stroke
    }
}

function onMemeSelected(idx) {
    var memes = loadFromStorage(STORAGE_KEY)
    gMeme = memes[idx];
    clearGallery();
    document.querySelector('.meme-editor').classList.remove('hide');
    renderMeme();
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
    gMeme.lines[gMeme.selectedLineIdx].stroke = document.getElementById('stroke-color').value;
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
    console.log('got here', pos, gMeme);

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

function setRandomMeme() {
    clearGallery();
    var gElMemeEditor = document.querySelector('.meme-editor')
    gElMemeEditor.classList.remove('hide');
    gMeme.selectedImgId = getRandomIntInclusive(0, (gImgs.length - 1));
    gMeme.selectedLineIdx = 0;
    if ((getRandomIntInclusive(0, 100)) > 50) {
        gMeme.lines = [
            createLine(makeLorem(7), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor()),
            createLine(makeLorem(7), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor())
        ]
    } else gMeme.lines = [createLine(makeLorem(10), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor())]

    renderMeme();
}

function saveMemeToStorage() {
    var memes = loadFromStorage(STORAGE_KEY);
    if (!memes || memes.length === 0) memes = [];
    memes.push(gMeme);
    saveToStorage(STORAGE_KEY, memes);
}

function getFilteredImgs() {
    var val = document.querySelector('.search-input').value;
    var lowerVal = val.toLowerCase();
    var filteredImgs = gImgs.filter((img) => img.keywords.includes(lowerVal));
    return filteredImgs;
}

function resetMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            font: 'Impact',
            txt: 'MEME GENERATOR',
            size: 40,
            align: 'left',
            color: 'white',
            stroke: 'black'
        }]
    };
}

function setStickerLine(sticker) {
    var line = createLine(sticker);
    line.type = 'sticker';
    gMeme.lines.push(line);
    renderMeme();
}

function renderStickers() {
    const startIdx = gStickerPageIdx * gStickerPageSize
    var stickers = gStickers.slice(startIdx, startIdx + gStickerPageSize)
    var strHtml = '';
    stickers.forEach((sticker) => {
        strHtml += `<div onclick="setStickerLine('${sticker}')">${sticker}</div>`
    })
    document.querySelector('.stickers').innerHTML = strHtml;
}

function setNextPage() {
    gStickerPageIdx++
    if (gStickerPageIdx * gStickerPageSize >= gStickers.length) {
        gStickerPageIdx = 0;
    }
    renderStickers();
}

function setPrevPage() {
    gStickerPageIdx--
    if (gStickerPageIdx * gStickerPageSize <= 0) {
        gStickerPageIdx = 0;
    }
    renderStickers();
}

function saveMemeUrl(url) {
    gMeme.memeUrl = url;
    saveMemeToStorage();
}