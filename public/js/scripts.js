// Data variables
var data2015 = [];
var data2016 = [];
var data2017 = [];

// Functions

function isMobileWidth() {
    return $('#mobile-indicator').is(':visible');
}

function toggleView() {
    if (!isMobileWidth()) {
        $("#wrapper").addClass("toggled");
    } else {
        $("#wrapper").removeClass("toggled");
    }
}

function getData(year, list) {
    $.getJSON("data/" + year + ".json", function (data) {
        data.forEach(function(item){
            list.push(item);
        });
    });
}

// Event Handlers

// Sidebar toggle
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Load dinamic content
$(".sidebar-nav li a").click(function (e) {
    e.preventDefault();
    var url = this.href;
    $("#content").load(url);
});

$(window).resize(function () {
    toggleView();
});


// Run when the page finishes loading
$(document).ready(function () {
    toggleView();
    getData("2015", data2015);
    getData("2016", data2016);
    getData("2017", data2017);
});
