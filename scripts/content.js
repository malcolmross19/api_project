// Declare variables
var searchField = document.querySelector('#searchTerm');
var submit = document.querySelector('#searchButton');
var apiEndPoint = 'http://gateway.marvel.com';
const publicKey = 'ac4d32842c9e3072e8cadc2f16800311';
const privateKey = '7244aae150027e21e7ca73af153c823f6af30304';


// Listen for form submission
submit.addEventListener('click', function(e) {
    // Capture value from input field
    var query = searchField.value;

    if (query) {
        // Set additional values for query
        var limit = "9";

        // Build query string with a template literal
        var url = apiEndPoint +=
            '/v1/public/characters?nameStartsWith=' + query + '&limit=' + limit + '&apikey=' + publicKey;

        // Instantiate new instance of XHR object
        var request = new XMLHttpRequest();

        // Send the request
        request.overrideMimeType('application/json');
        request.open('GET', url, true);
        request.send();

        var responseObject = JSON.parse(request.responseText); // Parse the data from JSON
        console.log(responseObject.data.results);

        // Do something with the data
        var comicsContent = '';

        for (var i = 0; i < responseObject.data.results.length; i++) {
            if(responseObject.data.results[i].comics.available > 0){
                comicsContent += '<div class=comic>';
                comicsContent += '<img src=' + responseObject.data.results[i].thumbnail.path + ' ';
                comicsContent += 'alt=comic />'; //+ responseObject.data.results[i].name + ' />';
                comicsContent += '</div>';
            }
        }

        // Update the page with content
        var comics = document.querySelector('#searchResults');

        if (comicsContent) {
            comics.innerHTML = comicsContent;
        }

    } else {
        // Prevent default action from occurring
        e.preventDefault();
    }


}, false);


window.addEventListener('load', function() {
    // Clears the search field when the page loads
    document.querySelector('#searchTerm').value = "";
}, false);


function GetHash() {
    var date = Date.now();
    var timeStamp = date.getMilliseconds();
    var md5Hash = md5(timeStamp + privateKey + publicKey);
}

