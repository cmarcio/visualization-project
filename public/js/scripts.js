// Data variables
var data2015 = [];
var data2016 = [];
var data2017 = [];
var countries = {};

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

function getCountries(){
    $.getJSON("data/countries.json", function (data) {
        countries = data;
    });
}

function getContinentName(continent_code){
    var option = {
        "AF": "Africa",
        "AN": "Antarctica",
        "AS": "Asia",
        "EU": "Europe",
        "NA": "North america",
        "OC": "Oceania",
        "SA": "South america"
    }
    return option[continent_code];
}

function getContinentIndex(continent_code) {
    var option = {
        "AF": 0,
        "AN": 3, // same as europe
        "AS": 1,
        "EU": 3,
        "NA": 2,
        "OC": 4,
        "SA": 2
    }
    return option[continent_code];
}

// PRE-PROCESS ONLY get a code -> country object and turn into a country -> code
function convertCodeCountry(next){
    $.getJSON("data/code_country.json", function (data) {
        Object.keys(data).forEach(function (key) {
            countries[data[key]] = key;
        });
        next();
    });
}

// PRE-PROCESS ONLY join the country data to it's continent
function country_continent(){
    $.getJSON("data/country_code_continent.json", function (data) {
        Object.keys(countries).forEach(function(country_name){
            var country_code = countries[country_name];
            countries[country_name] = {
                "code": country_code,
                "Continent": data[country_code]
            };
        });
        console.log(JSON.stringify(countries));
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
    $("#content").load("/description.html");
    getData("2015", data2015);
    getData("2016", data2016);
    getData("2017", data2017);
    getCountries();
    // convertCodeCountry(country_continent); // Used when pre processing. Result is saved as countries.json
});
