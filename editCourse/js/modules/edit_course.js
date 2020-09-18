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

    const re = /courses.(\d+).*modules.(\d+).*/;
    const arr = re.exec(window.location.pathname);
    const moduleId = 39//arr[2];
    const courseId = 25//arr[1];

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
                        //if (e.keyCode === 192) {
                            document.querySelectorAll('pre code').forEach((block) => {
                                hljs.highlightBlock(block);
                            });
                        //}
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
                /*$.getJSON(`/api/modules/${moduleId}/lessons`, (data) => {
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
                });*/
                const data = JSON.parse(`[{"id":98,"text":"## Адреса и переменные\\n\\nКак вы уже знаете, переменные — это имена кусочков памяти, которые могут хранить информацию. Помним, что компьютеры имеют оперативную память, которая доступна программам для использования. Когда мы определяем переменную, часть этой памяти отводится ей.\\n\\nНаименьшая единица памяти — **бит** (англ. «bit» от «binary digit»), который может содержать либо значение 0, либо значение 1. Вы можете думать о бите, как о переключателе света — либо свет выключен (0), либо включен (1). Чего-то среднего между ними нет.\\n\\n## Объявление переменных\\n\\nВы уже знаете, как объявить целочисленную переменную:\\n\\n\`\`\`C++\\nint nVarName; // int - это тип, а nVarName - это имя переменной\\n\`\`\`\\nПринцип объявления переменных других типов аналогичен:\\n\`\`\`C++\\ntype varName; // type - это тип (например, int), а varName - это имя переменной\\n\`\`\`\\nОбъявление пяти переменных разных типов:\\n\`\`\`C++\\nbool bValue;\\nchar chValue;\\nint nValue;\\nfloat fValue;\\ndouble dValue;\\nbool bValue;\\nchar chValue;\\nint nValue;\\nfloat fValue;\\ndouble dValue;\\n\`\`\`\\n\\nОбратите внимание, переменной типа void здесь нет (о типе void мы поговорим детально на следующем уроке).\\n\\n\`\`\`C++\\nvoid vValue; // не будет работать, так как void не может использоваться в качестве типа переменной\\n\`\`\`\\n## Инициализация переменных\\n\\nПри объявлении переменной мы можем присвоить ей значение в этот же момент. Это называется инициализацией переменной.\\n\\nC++ поддерживает два основных способа инициализации переменных:\\n\\nСпособ №1: Копирующая инициализация (или «инициализация копированием») с помощью знака равенства =:\\n\\n\`\`\`C++\\nint nValue = 5; // копирующая инициализация\\n\`\`\`\\nСпособ №2: Прямая инициализация с помощью круглых скобок ():\\n\\n\`\`\`C++\\nint nValue(5); // прямая инициализация\\n\`\`\`\\nПрямая инициализация лучше работает с одними типами данных, копирующая инициализация — с другими.","name":"Инициализация, присваивание и объявление переменных","number":1,"autor":{"id":25,"login":"admin"}},{"id":99,"text":"### Цикл for\\n\\nЦиклы for могут быть несколько сложны для новичков, однако опытные кодеры любят их, так как эти циклы очень компактны и удобны. Для наглядности, давайте преобразуем цикл for, приведенный выше, в эквивалентный цикл while:\\n\`\`\`cs\\n#include <iostream>\\n\\nint main()\\n{\\n\\t{ // внешние скобки нужны для обеспечения области видимости цикла\\n\\t\\tint count = 0;\\n\\t\\twhile (count < 10)\\n\\t\\t{\\n\\t\\t\\tstd::cout << count << \\" \\";\\n\\t\\t\\t++count;\\n\\t\\t}\\n\\t}\\n\\n\\treturn 0;\\n}\\n\`\`\`\\n\\nОбратите внимание, внешние фигурные скобки здесь необходимы, так как переменная count выходит из области видимости при завершении цикла.\\n\\n### Еще примеры циклов for\\nДавайте, используя цикл for, напишем функцию вычисления значений в степени n:\\n\`\`\`C++\\nint pow(int base, int exponent)\\n{\\n    int total = 1;\\n \\n    for (int count=0; count < exponent; ++count)\\n        total *= base;\\n \\n    return total;\\n}\\n\`\`\`","name":"Тип данных void","number":2,"autor":{"id":25,"login":"admin"}},{"id":100,"text":"# Header 1","name":"Размер типов данных","number":3,"autor":{"id":25,"login":"admin"}},{"id":101,"text":"# Header 1\\n## Header 2","name":"Урочек еще один","number":4,"autor":{"id":25,"login":"admin"}}]`)
                data.forEach(element => {
                    console.log(element);
                    const lesson = new Lesson(this.parent, element.id, element.text, element.name, element.number - 1);
                    this.lessons.push(lesson);
                    console.log('one');
                });
                if (this.lessons.length > 0) {
                    this.render();
                    this.lessons.sort(function (a, b) {
                        return a.index - b.index;
                    });
                    $('.btn_blue:first').click();
                }

            }

            render() {
                console.log("render");
                this.lessons.forEach(element => {
                    console.log("render", element);
                    element.render();
                });
            }

            addNewTab(name) {
                if (name !== "") {
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
                    url: `/api/modules/${moduleId}/lessons`,
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

            ajaxSaveLesson(lesson, intervalId) {
                const data = {
                    number: lesson.index + 1,
                    id: lesson.id,
                    name: lesson.name,
                    text: lesson.text
                };

                $.ajax({
                    method: "PUT",
                    type: "PUT",
                    url: `/api/modules/${moduleId}/lessons/${lesson.id}`,
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
                    clearInterval(intervalId);
                    console.log('Произошла ошибка сохранения урока!');
                });
            }

            closeAddTab() {
                this.parent.unbind('keydown');
                this.parent.text('+');
            }

            autosave() {
                const intervalId = setInterval(function(lessons) {
                    lessons.lessons.forEach((element) => {
                        console.log('autosave', element);
                        lessons.ajaxSaveLesson(element, intervalId);
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