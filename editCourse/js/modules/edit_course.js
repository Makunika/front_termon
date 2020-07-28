"use strict";
import $ from 'jquery';


export default function editCourse() {

    let currentPage = $('.active_link');
    let currentContent = $('.active_content');
    
    $('.tabs_link:not(:last-child)').each(function(index) {
        $(this).click(function(e) {
            if (!$(e.target).hasClass('active_link')) {
                currentPage.toggleClass('active_link');
                $(e.target).toggleClass('active_link');
                currentPage = $(e.target);

                
            }
        });
    });
}