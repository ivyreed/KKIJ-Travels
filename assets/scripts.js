var textArea = document.querySelector("#aside-text-area");
var searchBtn = document.querySelector("#search-button");
var popularCity = document.querySelectorAll("#la-events, #ny-events, #miami-events");
var displayVenues = document.querySelector("#venues");
var venueLocation = document.querySelector("#location-list");

function placesTravel(){
    var apiKey = "Efd8lGNsvYBNxWvkrSLfqqavEwDHSeey"
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=Raleigh&apikey=${apiKey}`

    fetch(queryURL)
    .then(function(resp) { return resp.json()})
    .then(function(data) {console.log(data)})
}
