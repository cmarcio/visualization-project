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
});
