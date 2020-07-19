"use strict";



document.addEventListener('DOMContentLoaded', (event) => {

    const contentAll = document.querySelector('.content_all');
    const footer = document.querySelector('.footer');




    window.addEventListener("resize", footerBottom);


    footerBottom();

    function footerBottom() {
        if (document.querySelector('.content_all').offsetHeight < screen.height) {
            document.querySelector('.footer').classList.add('footer-fix');
            document.querySelector('.footer').classList.remove('footer-bottom');
        } else {
            document.querySelector('.footer').classList.add('footer-bottom');
            document.querySelector('.footer').classList.remove('footer-fix');
        }
    }

});