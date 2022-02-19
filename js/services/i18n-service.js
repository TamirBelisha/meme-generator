'use strict';

var gTrans = {
    'gallery-tab': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'memes-tab': {
        en: 'Memes',
        he: 'מימס'
    },
    'about-tab': {
        en: 'About',
        he: 'אודות'
    },
    'dog-keyword': {
        en: 'Dog',
        he: 'כלב'
    },
    'funny-keyword': {
        en: 'Funny',
        he: 'מצחיק'
    },
    'baby-keyword': {
        en: 'Baby',
        he: 'תינוק'
    },
    'surprise-keyword': {
        en: 'Surprise',
        he: 'מופתע'
    },
    'politician-keyword': {
        en: 'Politician',
        he: 'פוליטיקאי'
    },
    'victory-keyword': {
        en: 'Victory',
        he: 'ניצחון'
    },
    'im-flexible': {
        en: `I'm flexible`,
        he: 'תפתיע אותי'
    },
    'share': {
        en: 'Share',
        he: 'שתף'
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    }
}
var gCurrLang = 'en';

function getCurrLang() {
    return gCurrLang;
}

function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
    document.querySelector('.search-input').placeholder = (gCurrLang === 'en') ? 'Search' : 'חפש'
    document.querySelector('.txt-input').placeholder = (gCurrLang === 'en') ? 'MEME GENERAOT' : 'הכנס טקסט'
}