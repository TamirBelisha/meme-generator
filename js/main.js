'use strict';

function onInit() {
    renderGallery();
    initMeme();
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const images = getMemeImgs();
    images.forEach(el => {
        elGallery.innerHTML += `
        <img src="img/${el.id}.jpg" onclick="onImgSelect(${el.id})">
        `
    })
}

function clearGallery() {
    const elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = '';
}

function onImgSelect(id) {
    setImg(id);
    clearGallery();
}