'use strict';
const STORAGE_KEY = 'memesDB';
const STORAGE_IMG_KEY = 'imgsDB';
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
    { id: 19, url: 'img/19.jpg', keywords: ['funny', 'angry', 'yelling', 'haircut'] },
    { id: 20, url: 'img/20.jpg', keywords: ['funny', 'swiss', 'snow', 'winter', 'lady', 'mountain', 'green'] },
    { id: 21, url: 'img/21.jpg', keywords: ['funny', 'qoute', 'drevil', 'surprise', 'finger'] },
    { id: 22, url: 'img/22.jpg', keywords: ['funny', 'baby', 'dancing', 'dance', 'victory', 'smile'] },
    { id: 23, url: 'img/23.jpg', keywords: ['funny', 'trump', 'politician', 'finger', 'angry', 'speech'] },
    { id: 24, url: 'img/24.jpg', keywords: ['funny', 'dog', 'laying', 'look'] },
    { id: 25, url: 'img/25.jpg', keywords: ['funny', 'lady', 'singer', 'yelling', 'crowd', 'stage'] },
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
    var imgs = loadFromStorage(STORAGE_IMG_KEY);
    if (!imgs || imgs.length === 0) {
        imgs = gImgs
    }
    return imgs;
}

function createImgObject(url) {
    var imgs = getMemeImgs();
    var image = {
        id: (imgs.length + 1),
        url
    }
    gMeme.selectedImgId = image.id;
    imgs.push(image);
    saveToStorage(STORAGE_IMG_KEY, imgs)
    renderMeme();
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
    var ctx = getCtx();
    var canvas = getCanvas();
    var mesaures = ctx.measureText(currLine.txt)
    currLine.align = key;
    switch (key) {
        case 'left':
            currLine.pos.x = 0;
            break;
        case 'center':
            currLine.pos.x = ((canvas.width / 2) - (mesaures.width / 2));
            break;
        case 'right':
            currLine.pos.x = (canvas.width - mesaures.width);
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



function isLineClicked(pos, ev) {
    var isTrue = false;
    const touchEvs = ['touchstart', 'touchmove', 'touchend']

    gMeme.lines.forEach((line, idx) => {
        if (pos.x > line.pos.x && pos.x < (line.pos.x + line.pos.xLength) && pos.y > line.pos.y && pos.y < (line.pos.y + line.size)) {
            gMeme.selectedLineIdx = idx;
            if (!gTouchEvs.includes(ev.type)) {
                var input = document.getElementById('txt-input');
                input.focus();
            }

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
            createLine(makeLorem(4), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor()),
            createLine(makeLorem(4), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor())
        ]
    } else gMeme.lines = [createLine(makeLorem(4), 'Impact', getRandomIntInclusive(16, 50), 'left', getRandomColor(), getRandomColor())]

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
    var filteredImgs = gImgs.filter(img => {
        var keywords = img.keywords;
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i].includes(lowerVal)) return img
        }
    })
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