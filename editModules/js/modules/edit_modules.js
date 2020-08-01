import $ from 'jquery';
import ModuleCourse from './entity/ModuleCourse';

export default function editModules() {



    class ModuleCourseRenderer extends ModuleCourse {

        constructor(name, index, lessons, id, parent) {
            super(name, "", index, lessons, id, parent);
        }

        render() {
            $(super.parentModule).append(this._render());
        }

        renderBefore(node) {
            $(node).before(this._render());
        }

        _render() {
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
        }

        saveAjax() {
            const data = {
                number: this.indexModule + 1,
                id: super.idModule,
                name: super.nameModule
            }
            $.ajax(`/api/courses/id/modules/${this.indexModule}`, {
                method: 'PUT',
                crossDomain: true,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }).done(data => {
                console.log('ok put', data);
            }).fail(data => {
                console.log('Произошла ошибка сохранения модуля!');
            })
        }

        createAjax() {
            const data = {
                number: this.indexModule + 1,
                name: super.nameModule
            }
            return $.ajax(`/api/courses/id/modules`, {
                method: 'POST',
                crossDomain: true,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }).done(data => {
                super.idModule = data.id;
                super.lessonsModule = data.lessons;
                console.log('ok put', data);
            }).fail(data => {
                console.log('Произошла ошибка сохранения модуля!');
            })
        }

        get lessonsModule() {
            return super.lessonsModule;
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
                this.sortByIndex();
                this.render();

                setClickAccordions();
                this.initSelect();
            });
            this.render();
            setClickAccordions();
            this.initSelect();
        }
        
        render() {
            this.modules.forEach(element => {
                element.render();
            });
            $(this.parent).append(/*html*/`
                <li class="accordion_item">
                    <div class="accordion_header">
                        <button class="accordion_button"><span>Добавить модуль</span></button>
                    </div>
                </li>
            `);
        }

        initSelect() {
            $(this.parent).children('.accordion_item').each((index, element) => {
                const elementC = $(element).children('.accordion_header').children('select');
                let i = 1;
                let html = "";
                this.modules.forEach((moduleC) => {
                    if (moduleC.indexModule === index) {
                        
                        html += `<option value="${i}" selected >${i}</option>`;
                    } else {
                        html += `<option value="${i}">${i}</option>`;
                    }
                    i++;
                });
                elementC.html(html);
            });
            this.initChange();
        }

        initChange() {
            $(this.parent).children('.accordion_item').each((index, element) => {
                const elementC = $(element).children('.accordion_header').children('select');
                elementC.unbind();
                elementC.bind('change', () => {
                    console.log(elementC.val());
                    if (index !== elementC.val() - 1) {
                        this.swap(this.modules[elementC.val() - 1], this.modules[index]);
                    }
                });
            });
        }

        swap(module1, module2) {
            console.log($(this.parent).children('.accordion_item').eq(module1.index));
            console.log($(this.parent).children('.accordion_item').eq(module2.index));
            if (module2.indexModule < module1.indexModule) {
                $(this.parent).children('.accordion_item').eq(module1.index).before($(this.parent).children('.accordion_item').eq(module2.index));
                $(this.parent).children('.accordion_item').eq(module2.index).before($(this.parent).children('.accordion_item').eq(module1.index));
            } else {
                $(this.parent).children('.accordion_item').eq(module2.index).before($(this.parent).children('.accordion_item').eq(module1.index));
                $(this.parent).children('.accordion_item').eq(module1.index).before($(this.parent).children('.accordion_item').eq(module2.index));
            }
            const tmpIndex = module1.indexModule;
            module1.indexModule = module2.indexModule;
            module2.indexModule = tmpIndex;
            $(this.parent).children('.accordion_item')
                .eq(module1.indexModule).children('.accordion_header').children('select').val(module1.indexModule + 1);
            $(this.parent).children('.accordion_item')
                .eq(module2.indexModule).children('.accordion_header').children('select').val(module2.indexModule + 1);
            this.initChange();
            this.sortByIndex();
            this.saveAjax(module1, module2);
        }

        sortByIndex() {
            this.modules.sort(function(a, b) {
                return a.index - b.index;
            });
        }

        saveAjax(...modules) {
            modules.forEach(element => {
                element.saveAjax();
            });
        }

        newModule() {
            let newModule = new ModuleCourseRenderer(
                'Поменять название в настройках модуля', this.modules.length, [], 1, this.parent);
            newModule.createAjax().then((data) => {
                newModule.renderBefore('.accordion_item:last')
                this.modules.push(newModule);
            });
            newModule.renderBefore('.accordion_item:last')
            this.modules.push(newModule);
            this.initSelect();
            setClickAccordions();
        }
    }


    const moduleCourses = new ModuleCourses('.content_programm');
    moduleCourses.initAjax();

    function setClickAccordions() {
        $('.accordion_item:not(:last)').each(function(indx) {
            $(this).children('.accordion_header').children('.accordion_button:first').unbind().click(function() {
                $(this).parent().siblings('.accordion_content').slideToggle(300);
                $(this).children('svg').toggleClass('svg_rotate');
            });
            $(this).children('.accordion_header').children('.accordion_button:last').unbind().click(function() {
                const id = moduleCourses.modules[indx].id;
                $(this).attr('href', `/user/modules/${id}/lessons`);
            });
        });
        $('.accordion_item:last').unbind().click(function () {
            moduleCourses.newModule();
        });

    }

    const re = /courses.(\d+).*/;
    console.log(re.exec('/user/courses/45/allo'));
    //${window.location.pathname}


}