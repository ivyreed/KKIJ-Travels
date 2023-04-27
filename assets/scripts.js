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

function loadMaps() {
    var apiKey = 'AljsI1cce55ZdqJLOmRmaNeZTfNQdL6DbjCMScetIUaHu4ydHWKlyRvGF0PmqAq4';
    fetch('https://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=47.610,-122.107&wayPoint.2=45.610,-122.107&key=' + apiKey)
    

    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }

  loadMaps ();