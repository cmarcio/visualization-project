
function isMobileWidth() {
    return $('#mobile-indicator').is(':visible');
}

function toggleView() {
    if (!isMobileWidth()) {
        $("#wrapper").addClass("toggled");
        //$("#menu-toggle").hide();
    } else {
        $("#wrapper").removeClass("toggled");
        //$("#menu-toggle").show();
    }
}

// Menu Toggle Script
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(window).resize(function () {
    toggleView();
});

toggleView();
