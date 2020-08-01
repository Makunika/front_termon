




export default class ModuleCourse {
    constructor(name, about, index, lessons, id, parent) {
        this.name = name;
        this.index = index;
        this.id = id;
        this.parent = parent;
        this.about = about;
        this._lessons = lessons;
    }

    render() {
        alert('Переопредли render()');
    }

    saveAjax() {
        alert('Переопредли saveAjax()');
    }

    createAjax() {
        alert('Переопредли createAjax()');
    }

    get nameModule() {
        return this.name;
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
        return this._lessons;
    }


    set lessonsModule(value) {
        this._lessons = value;
    }

    get indexModule() {
        return this.index;
    }

    set indexModule(index) {
        this.index = index;
    }
}