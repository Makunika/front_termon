"use strict";
import $ from 'jquery';


export default function course() {

/*
    function setClickAccordions() {
        $('.accordion_button').each(function(indx) {
            $(this).click(function() {
                $(this).next().slideToggle(300);
                $(this).children('svg').toggleClass('svg_rotate');
            });
        });
    }
    /* Programm loaded 


    class ModuleCourse {
        constructor(name, index, lessons) {
            this.name = name;
            this.index = index;
            this.lessons = lessons;
        }

        render(parent) {
            $(parent).append(() => {
                let value =  `<li class="accordion_item">
                <button class="accordion_button"><span>${this.name}</span><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                        height="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
                <div class="accordion_content hide">
                    <ol class="accordoin_sublist">`;

                    this.lessons.forEach(element => {
                    value += `<li class="accordion_sublist_item">${element.name}</li>`;
                });
                value += `</ol></div></li>`;
                return value;
            });
        }
    }
    //${window.location.pathname}

    $.getJSON(`http://localhost:8080/api/courses/38/modules`, function(data) {
        console.log(data);
        data.forEach(element => {
            console.log(element);
            new ModuleCourse(element.name, element.index, element.lessons)
            .render('.content_programm');
        });
        setClickAccordions();
    });*/

}