import navbar from './modules/common';
import course from './modules/course';
import editCourse from './modules/edit_course';
import $ from 'jquery';


$(document).ready(function() {
    navbar();
    course();
    editCourse();

});