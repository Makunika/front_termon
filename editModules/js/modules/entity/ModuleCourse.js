




export default class ModuleCourse {
    constructor(name, about, index, lessons, id, parent) {
        this.name = name;
        this.index = index;
        this.lessons = lessons;
        this.id = id;
        this.parent = parent;
        this.about = about;
    }

    render() {
        alert('Переопредли render()');
    }

    get nameModule() {
        return this.name;
    }

    set nameModule(name) {
        this.name = name;
    }

    get idModule() {
        return this.id;
    }

    set idModule(id) {
        this.id = id;
    }

    get parentModule() {
        return this.parent;
    }

    set parentModule(parent) {
        this.parent = parent;
    }

    get lessonsModule() {
        return this.lessons;
    }

    set lessonsModule(lessons) {
        this.lessons = lessons;
    }

    get indexModule() {
        return this.index;
    }

    set indexModule(index) {
        this.index = index;
    }
}