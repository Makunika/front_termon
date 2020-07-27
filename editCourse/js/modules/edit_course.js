"use strict";
import $ from 'jquery';


export default function editCourse() {

    $( "#tabs" ).tabs()
        .find( ".ui-tabs-nav" )
        .sortable({ axis: "x" });
        //
}