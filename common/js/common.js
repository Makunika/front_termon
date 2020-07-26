"use strict";



document.addEventListener('DOMContentLoaded', (event) => {

    //NAVBAR

    const links = Array.from(document.querySelector('.header_links').children);


    if (links.length > 2) {
        document.querySelector('.header').classList.add("header-3");
    } else {
        document.querySelector('.header').classList.add("header-2");
    }



    //FOOTER

    if (document.querySelector('.content_all').offsetHeight <
     screen.height - 200) {
        document.querySelector('.footer').classList.add('footer-fix');
        document.querySelector('.footer').classList.remove('footer-bottom');
     } else {
        document.querySelector('.footer').classList.add('footer-bottom');
        document.querySelector('.footer').classList.remove('footer-fix');
    }

});