"use strict";
import $ from 'jquery';



export default function navbar() {
    //NAVBAR

    if ($('.header_links').children().length > 2) {
        $('.header').addClass("header-3");
    } else {
        $('.header').addClass("header-2");
    }

    //sssss


    //FOOTER

    /*
    if (document.querySelector('.content_all').offsetHeight <
     screen.height - 200) {
        document.querySelector('.footer').classList.add('footer-fix');
        document.querySelector('.footer').classList.remove('footer-bottom');
     } else {
        document.querySelector('.footer').classList.add('footer-bottom');
        document.querySelector('.footer').classList.remove('footer-fix');
    }*/

}