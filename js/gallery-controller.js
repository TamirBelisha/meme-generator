'use strict';
var gElMemeEditor = document.querySelector('.meme-editor')
var isFilterOn = false;

function onInit() {
    renderGallery();
    initMeme();
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const images = (isFilterOn) ? getFilteredImgs() : getMemeImgs();
    if (images.length === 0) return
    elGallery.innerHTML = '';
    images.forEach(img => {
        if (img.id <= 25) {
            elGallery.innerHTML += `
            <img src="img/${img.id}.jpg" class="img-item" onclick="onImgSelect(${img.id})">
            `
        } else {
            elGallery.innerHTML += `
            <img src="${img.url}" class="img-item" onclick="onImgSelect(${img.id})">
            `
        }
    })
    gElMemeEditor.classList.add('hide');
    isFilterOn = false;
    resetMeme();
}

function clearGallery() {
    const elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = '';
}

function onImgSelect(id) {
    setImg(id);
    clearGallery();
    gElMemeEditor.classList.remove('hide');
}

function setFilterBy(ev) {
    ev.preventDefault();
    var val = document.querySelector('.search-input').value;
    isFilterOn = (val) ? true : false;
    renderGallery();
}

function setFilterByWord(el, key) {
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    el.style.fontSize = fontSize + 3 + 'px'
    document.querySelector('.search-input').value = key;
    isFilterOn = true;
    renderGallery()
}

function renderMyMemes() {
    const elGallery = document.querySelector('.gallery-container');
    const memes = loadFromStorage('memesDB');
    if (!memes || memes.length === 0) return;
    elGallery.innerHTML = '';
    memes.forEach((el, idx) => {
        elGallery.innerHTML += `
        <img src="${el.memeUrl}" onclick="onMemeSelected(${idx})">
        `
    })
    gElMemeEditor.classList.add('hide');
    isFilterOn = false;
    resetMeme();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}