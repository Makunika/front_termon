"use strict";
import $, {
    ajax
} from 'jquery';
import showdown from 'showdown';
import youtube from 'showdown-youtube';
import hljs from 'highlight.js';


export default function editCourse() {
    hljs.initHighlightingOnLoad();

    tabsInit();


    function tabsInit() {


        let currentPage = $('.active_link');
        let currentContent = $('.show_flex');

        $('.btn_blue:not(:last)').each(function (index) {
            $(this).unbind('click');
            $(this).click(function (e) {
                if (!$(e.target).hasClass('active_link')) {
                    currentPage.toggleClass('active_link');
                    $(e.target).toggleClass('active_link');
                    currentPage = $(e.target);


                    currentContent.addClass('hide').removeClass('show_flex');
                    $(`.tabs_content`).eq(index)
                        .addClass('show_flex').removeClass('hide');
                    currentContent = $(`.tabs_content`).eq(index);
                }
            });
        });
    }


    let pathname = window.location.pathname;
    pathname = pathname.substring(5, pathname.length);
    const converterMark = new showdown.Converter({
        extensions: ['youtube'],
        smoothPreview: true
    });

    class Lesson {
        constructor(parent, id, text, name, index) {
            this.parent = parent;
            this.id = id;
            this.text = text;
            this.index = index;
            this.name = name;
        }

        render() {
            this.parent.before(
                /*html*/
                `<button class="btn_blue">${this.name}</button>`
            );
            $('.tabs_contents').append(
                /*html*/
                `
                                    <div class="tabs_content hide">
                                    <div class="tabs_flex_column mark">
                                        <h2>Markdown</h2>
                                        <textarea class="mark_textarea"></textarea>
                                    </div>
                                    <div class="tabs_flex_column review">
                                        <h2>Preview</h2>
                                        <div class="review_content"></div>
                                    </div>
                                    </div>
                                    `
            );
            tabsInit();

            $('.tabs_content:last .mark_textarea').val(this.text)
                .keyup(
                    (e) => {
                        this.text = $(e.target).val();
                        const review = $(e.target).parent('.mark').siblings('.review').children('.review_content');
                        review.html(converterMark.makeHtml(this.text));
                        console.log(e.key, e.keyCode);
                        if (e.keyCode == 192) {
                            document.querySelectorAll('pre code').forEach((block) => {
                                hljs.highlightBlock(block);
                            });
                        }
                        }).keyup();


                }
        }

        class Lessons {
            constructor(parent) {
                this.parent = parent;
                this.lessons = [];
                this.getLessons();
            }

            getLessons() {
                $.getJSON("/api/modules/8/lessons", (data) => {
                    data.forEach(element => {
                        console.log(element);
                        const lesson = new Lesson(this.parent, element.id, element.text, element.name, element.number - 1);
                        this.lessons.push(lesson);
                        console.log('one');
                    });
                    console.log('exit...');
                }).done(() => {
                    console.log("go");
                    this.render();
                    this.lessons.sort(function (a, b) {
                        return a.index - b.index;
                    });
                });
                
            }

            render() {
                console.log("render");
                this.lessons.forEach(element => {
                    console.log("render", element);
                    element.render();
                });
            }

            addNewTab(name) {
                if (name != "") {
                    this.ajaxNewLesson(name);
                }
                this.closeAddTab();
            }

            ajaxNewLesson(name) {
                const lesson = new Lesson(this.parent, 0, "", name, this.lessons.length);
                const data =  {
                    name: lesson.name,
                    number: lesson.index + 1
                };

                $.ajax({
                    method: "POST",
                    type: "POST",
                    url: `/api/modules/8/lessons`,
                    crossDomain: true,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                }).done((data) => {
                    console.log('ok!', data);
                    lesson.id = data.id;
                    this.lessons.push(lesson);
                    lesson.render();
                }).fail((data) => {
                    console.log('Произошла ошибка добавления нового урока!');
                });
            }

            ajaxSaveLesson(lesson) {
                const data = {
                    number: lesson.index + 1,
                    id: lesson.id,
                    name: lesson.name,
                    text: lesson.text
                };

                $.ajax({
                    method: "PUT",
                    type: "PUT",
                    url: `/api/modules/8/lessons/${lesson.id}`,
                    crossDomain: true,
                    //dataType: 'jsonp',
                    //dataType: 'application/json',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                }).done((data) => {
                    console.log('ok!', data);
                }).fail((data) => {
                    console.log('Произошла ошибка сохранения урока!');
                });
            }

            closeAddTab() {
                this.parent.unbind('keydown');
                this.parent.text('+');
            }

            autosave() {
                const intervalId =setInterval(function(lessons) {
                    lessons.lessons.forEach((element) => {
                        console.log('autosave', element);
                        lessons.ajaxSaveLesson(element);
                    });
                }, 5000, this);
            }

        }


    const lessons = new Lessons($('.btn_blue:last'));
    lessons.autosave();

    function showAddTab(e) {
        const target = $(e.target);
        const text = target.text();
        target.keydown(function (e) {
            if (e.key === " ") {
                e.preventDefault();
                return false;
            }
        });
        target.html(
            /*html*/
            `
            <input class="tabs_input" type="text">
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
        input.keyup(function (e) {
            inputValue = $(e.target).val();
            console.log(inputValue, e.key);
            if (e.key === "Enter") {
                lessons.addNewTab(inputValue);
            } else if (e.key === " ") {
                inputValue += " ";
                $(e.target).val(inputValue);
            }
        });

        target.children('.tabs_svg:first').click(function (e) {
            lessons.addNewTab(inputValue);
        });
        target.children('.tabs_svg:last').click(function (e) {
            lessons.closeAddTab(target);
        });





    }

    $('.btn_blue:last').click(showAddTab);
    /*function saveNewTab(value, target) {
        

    }*/





    // markdown


    /*$('.mark_textarea').each(function(index) {
        $(this).keyup(function(e) {
            inputMarks[index] = $(this).val();
            const review = $(this).parent('.mark').siblings('.review').children('.review_content');
            review.html(converterMark.makeHtml(inputMarks[index]));
            console.log(e.key, e.keyCode);
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });


            if (parseInt($(this).css('min-height'), 10) < review.height()) {
                $(this).height(review.height());
            }
        }).keyup();
    });*/

    





}