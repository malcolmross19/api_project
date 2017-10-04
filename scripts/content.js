// Declare variables
var searchField = document.querySelector('#searchTerm');
var submit = document.querySelector('#searchButton');
var apiEndPoint = 'http://gateway.marvel.com';
const publicKey = 'ac4d32842c9e3072e8cadc2f16800311';
const privateKey = '7244aae150027e21e7ca73af153c823f6af30304';


// Listen for form submission
submit.addEventListener("click", function(e) {
    // Capture value from input field
    var query = searchField.value;

    if (query) {
        // Set additional values for query
        var limit = "10";

        // Build query string with a template literal
        var url =
            'http://gateway.marvel.com/v1/public/characters?nameStartsWith=' + query + '&limit=' + limit + '&apikey=' + publicKey;

        // Instantiate new instance of XHR object
        var request = new XMLHttpRequest();

        // Send the request
        request.overrideMimeType('application/json');
        request.open('GET', url, false);

        request.onreadystatechange = function() {
            var responseObject = JSON.parse(request.responseText); // Parse the data from JSON

            // Do something with the data
            var comicsContent = '';

            for (var i = 0; i < responseObject.data.results.length; i++) {
                if(responseObject.data.results[i].comics.available > 0){
                    comicsContent += '<article class=comic>';
                    comicsContent += '<img src=' + responseObject.data.results[i].thumbnail.path + '.';
                    comicsContent += responseObject.data.results[i].thumbnail.extension + ' ';
                    comicsContent += 'alt=' + responseObject.data.results[i].name + ' />';
                    comicsContent += '<div class=info>';
                    comicsContent += '<p><b>' + responseObject.data.results[i].name + '</b><br />';
                    if(responseObject.data.results[i].description == "" || responseObject.data.results[i].description == " "){
                        comicsContent += 'No Description Available</p></div>';
                    } else {
                        comicsContent += responseObject.data.results[i].description + '</p></div>';
                    }
                    comicsContent += '</article>';
                }
            }

            // Add the header back to the page
            var searchHeader = document.querySelector('#searchHeader');
            searchHeader.style.display = 'inline-block';

            // Update the page with content
            var comics = document.querySelector('#searchResults');

            if (comicsContent) {
                comics.innerHTML = comicsContent;
            }
        };
        request.send();

    } else {
        // Prevent default action from occurring
        e.preventDefault();
    }
}, false);


window.addEventListener('load', function() {
    // Clears the search field when the page loads
    document.querySelector('#searchTerm').value = "";
}, false);


