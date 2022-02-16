'use strict'

function onInit() {
    renderGallery();
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    for (var i = 1; i < 19; i++) {
        elGallery.innerHTML += `
        <img src="img/${i}.jpg">
        `
    }
}

function renderMeme() {

}