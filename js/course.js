"use strict";


document.addEventListener('DOMContentLoaded', (event) => {

    const buttonsAccordion = document.querySelectorAll('.accordion_button');

    buttonsAccordion.forEach((element) => {
       element.addEventListener('click', (event) => {
            const contentIn = element.nextElementSibling;
            if (contentIn.classList.length > 1) {
                
                element.querySelector('.acc_span').innerHTML = '-';
            } else {
                element.querySelector('.acc_span').innerHTML = '+';
            }
            contentIn.classList.toggle('hide');
       });
    });
});