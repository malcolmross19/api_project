// Declare variables
let searchField = document.querySelector('#searchTerm');
let submit = document.querySelector('#searchButton');
let searchForm = document.querySelector('#searchForm');
let hamburgerButton = document.querySelector('#hamburgerButton');
let closeButton = document.querySelector('#closeButton');
let ul = document.querySelector('#ul');
let menu = document.querySelector('#menu');
const publicKey = 'ac4d32842c9e3072e8cadc2f16800311';
let lastSearch = '';
let comicsContent = '';


// Listen for form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.clear();

    // Capture value from input field
    let query = searchField.value;

    if (query) {
        // Set additional values for query
        let limit = "10";

        // Build query string with a template literal
        let url =
            'http://gateway.marvel.com/v1/public/characters?nameStartsWith=' + query + '&limit=' + limit + '&apikey=' + publicKey;

        // Instantiate new instance of XHR object
        let request = new XMLHttpRequest();

        // Send the request
        request.overrideMimeType('application/json');
        request.open('GET', url, false);

        request.onreadystatechange = function () {
            let responseObject = JSON.parse(request.responseText); // Parse the data from JSON


            // Do something with the data
            for (let i = 0; i < responseObject.data.results.length; i++) {
                if (responseObject.data.results[i].comics.available > 0) {
                    comicsContent += '<article class=comic>';
                    comicsContent += '<img src=' + responseObject.data.results[i].thumbnail.path + '.';
                    comicsContent += responseObject.data.results[i].thumbnail.extension + ' ';
                    comicsContent += 'alt=' + responseObject.data.results[i].name + ' />';
                    comicsContent += '<div class=info>';
                    comicsContent += '<p class=name>' + responseObject.data.results[i].name + '</p>';
                    if (responseObject.data.results[i].description == "" || responseObject.data.results[i].description == " ") {
                        comicsContent += '<p class=desc>No Description Available</p></div>';
                    } else {
                        comicsContent += '<p class=desc>' + responseObject.data.results[i].description + '</p></div>';
                    }
                    comicsContent += '</article>';
                }
            }
            let comicsHTML = comicsContent;

            // Add the header back to the page
            let searchHeader = document.querySelector('#searchHeader');
            searchHeader.style.display = 'inline-block';

            // Save last search to local storage
            let results = JSON.stringify(comicsHTML);

            localStorage.setItem('lastSearch', results);

            // Update the page with content
            let comics = document.querySelector('#searchResults');

            if (comicsContent) {
                comics.innerHTML = comicsContent;
            }
        };
        request.send();

    } else {
        e.preventDefault();
    }

}, false);


window.addEventListener('load', function() {
    // Clears the search field when the page loads
    document.querySelector('#searchTerm').value = "";

    if(localStorage.getItem('lastSearch')) {
        // Grab the element where HTML will be written
        let comics = document.querySelector('#searchResults');

        // Retrieve the lastSearch data from local storage
        let results = localStorage.lastSearch;

        console.log(results);

        // Insert the last search data into the document
        comics.innerHTML = results;
    }

}, false);


hamburgerButton.addEventListener("click", function() {
    ul.style.display = 'block';
    menu.style.display = 'none';
}, false);

/*
closeButton.addEventListener("click", function() {
    menu.style.display = 'block';
    ul.style.display = 'none';
}, false);
*/

//Unhides a div
function unhideDiv(divId) {
    document.getElementById(divId).style.display = "block";
    document.getElementById(divId).style.height = "auto";
}

//Displays a hidden div
function hideDiv(divId) {
    document.getElementById(divId).style.display = "none";
    document.getElementById(divId).style.height = "0";
}

//Toggles the display of a div
function toggleDiv(divID) {
    let display = document.getElementById(divID).style.display;
    if (display == "block") {
        hideDiv(divID);
    }
    else {
        unhideDiv(divID);
    }
}
