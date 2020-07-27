"use strict";
import $ from 'jquery';


export default function course() {


    $('.accordion_button').each(function(indx) {
        $(this).click(function() {
            $(this).next().slideToggle(300);
            $(this).children('svg').toggleClass('svg_rotate');
        });
    });

    /* Programm loaded */

    class Lesson {
        constructor(name, index) {
            this.name = name;
            this.indes = index;
        }

        get index() {
            return this.index;
        }

        set index(index) {
            this.index = index;
        }

        get name() {
            return this.name;
        }
    }


    class ModuleCourse {
        constructor(name, index, lessons) {
            this.name = name;
            this.index = index;
            this.lessons = lessons;
        }

        render(parent) {
            $(parent).append(() => {
                let value = `<li class="accordion_item">
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
                value += `</ol></div></li>"`;
                return value;
            });
        }
    }
    //${window.location.pathname}

    $.getJSON(`http://localhost:8080/api/courses/38/modules`, function(data) {
        console.log(data);
    });
    /*$.ajax({
        url: "http://localhost:8080/api/courses/38/modules"
    }).then(function(data, status, jqxhr) {
        console.log(data.id);
        console.log(data.content);
       console.log(jqxhr);
    });*/

}