"use strict";
import $ from 'jquery';


export default function editCourse() {
    
    tabsInit();

    function tabsInit() {


        let currentPage = $('.active_link');
        let currentContent = $('.show_block');

        $('.tabs_link:not(:last)').each(function(index) {
            $(this).unbind('click');
            $(this).click(function(e) {
                if (!$(e.target).hasClass('active_link')) {
                    currentPage.toggleClass('active_link');
                    $(e.target).toggleClass('active_link');
                    currentPage = $(e.target);
    

                    currentContent.addClass('hide').removeClass('show_block');
                    $(`.tabs_content`).eq(index)
                        .addClass('show_block').removeClass('hide');
                    currentContent = $(`.tabs_content`).eq(index);
                }
            });
        });
    }
    

    //modal

    function openModal() {

    }

    //Add tab

    function showAddTab(e) {
        const target = $(e.target);
        const text = target.text();
        target.html(
            /*html*/
            `
            <input type="text" name="" id="">
            <svg class="tabs_svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
            width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            <svg class="tabs_svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
             width="24">
             <path d="M0 0h24v24H0z" fill="none"/>
             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
             </svg>
            `
            );

        let inputValue = "";

        const input = target.children('input');
        input.focus();
        input.keyup(function(e) {
            inputValue = $(e.target).val();

            if (e.key === "Enter") {
                saveNewTab(inputValue, target);
            }
        });

        target.children('.tabs_svg:first').click(function(e) {
            saveNewTab(inputValue, target);
        });
        target.children('.tabs_svg:last').click(function(e) {
            closeAddTab(target);
        });





    }

    function saveNewTab(value, target) {
        if (value != "") {
            console.log(value);
            target.before(
                /*html*/
                `<button class="tabs_link">${value}</button>`
            );
            $('.tabs_contents').append(
                                /*html*/
                                `
                                <div class="tabs_content hide">
                                <p>hello</p>
                                <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac
                                    lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing
                                    velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus
                                    eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis
                                    commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede.
                                    Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit.
                                    Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
                                </div>
                                `
            );
    
    
            tabsInit();
        }
        closeAddTab(target);

    }

    function closeAddTab(target) {
        target.text('+');
    }



    $('.tabs_link:last').click(showAddTab);




}