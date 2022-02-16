'use strict';
var gElMemeEditor = document.querySelector('.meme-editor')

function onInit() {
    renderGallery();
    initMeme();
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const images = getMemeImgs();
    elGallery.innerHTML = '';
    images.forEach(el => {
        elGallery.innerHTML += `
        <img src="img/${el.id}.jpg" onclick="onImgSelect(${el.id})">
        `
    })
    gElMemeEditor.classList.add('hide');

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