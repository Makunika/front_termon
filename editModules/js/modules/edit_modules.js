import $ from 'jquery';
import ModuleCourse from './entity/ModuleCourse';

export default function editModules() {

    /* Programm loaded */




    class ModuleCourseRenderer extends ModuleCourse {

        constructor(name, index, lessons, id, parent) {
            super(name, "", index, lessons, id, parent);
        }

        render() {
            $(super.parentModule).append(() => {
                console.log(super.nameModule);
                let value = /*html*/ `<li class="accordion_item">
                <div class="accordion_header">
                    <button class="accordion_button"><span>${super.nameModule}</span><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
                    <a href="/error" class="accordion_button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"
                            width="24" height="24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                    </a>
                    <select id="select" class="select" name="number">
                    </select>
                </div>
                <div class="accordion_content hide">
                    <ol class="accordoin_sublist">`;

                    super.lessonsModule.forEach(element => {
                    value += /*html*/ `<li class="accordion_sublist_item">${element.name}</li>`;
                });
                value += /*html*/ `</ol></div></li>`;
                return value;
            });
        }

        get lessonsModule() {
            return super.lessonsModule;
        }

        set lessonsModule(lessons) {
            super.lessonsModule = lessons;
        }

        get indexModule() {
            return super.indexModule;
        }

        set indexModule(index) {
            super.indexModule = index;
        }
    }


    class ModuleCourses {
        constructor(parent) {
            this.modules = [
                new ModuleCourseRenderer("name", 0, [{ name: 'nameLesson'}, { name: 'nameLesson'}, { name: 'nameLesson'}], 25, parent),
                new ModuleCourseRenderer("name2", 1, [{ name: 'nameLesson'}, { name: 'nameLesson'}, { name: 'nameLesson'}], 25, parent),
                new ModuleCourseRenderer("name3", 2, [{ name: 'nameLesson'}, { name: 'nameLesson'}, { name: 'nameLesson'}], 25, parent),
                new ModuleCourseRenderer("name4", 3, [{ name: 'nameLesson'}, { name: 'nameLesson'}, { name: 'nameLesson'}], 25, parent)
            ];
            this.parent = parent;
        }

        initAjax() {
            $.getJSON(`http://localhost:8080/api/courses/38/modules`, (data) => {
                console.log(data);
                data.forEach(element => {
                    console.log(element);
                    let moduleC = new ModuleCourseRenderer
                        (element.name, element.number, element.lessons, element.id, this.parent);

                    this.modules.push(moduleC);
                });
                this.modules.sort(function(a, b) {
                    return a.index - b.index;
                });
                this.modules.forEach(element => {
                    element.render();
                });

                setClickAccordions();
                this.initSelect();
            });
            this.modules.forEach(element => {
                element.render();
            });
            setClickAccordions();
            this.initSelect();
        }

        initSelect() {
            $(this.parent).children('.accordion_item').each((index, element) => {
                const elementC = $(element).children('.accordion_header').children('select');
                let i = 1;
                let html = "";
                this.modules.forEach((moduleC) => {
                    console.log(moduleC, moduleC.indexModule, index);
                    if (moduleC.indexModule == index) {
                        
                        html += `<option value="${i}" selected >${i}</option>`;
                    } else {
                        html += `<option value="${i}">${i}</option>`;
                    }
                    i++;
                });
                elementC.html(html);
            });
        }
    }


    const moduleCourses = new ModuleCourses('.content_programm');
    moduleCourses.initAjax();

    function setClickAccordions() {
        clearClicks();
        $('.accordion_item').each(function(indx) {
            $(this).children('.accordion_header').children('.accordion_button:first').click(function() {
                $(this).parent().siblings('.accordion_content').slideToggle(300);
                $(this).children('svg').toggleClass('svg_rotate');
            });
            $(this).children('.accordion_header').children('.accordion_button:last').click(function() {
                //const id = moduleCourses.modules[indx].id;
                //$(this).attr('href', `/user/modules/${id}/lessons`);
                $(this).attr('href', '/user/modules/${id}/lessons');
            });
        });
    }

    function clearClicks() {
        $('.accordion_item').each(function(indx) {
            $(this).children('.accordion_header').each(function() {
                $(this).unbind();
            });
        });
    }

    //${window.location.pathname}


}