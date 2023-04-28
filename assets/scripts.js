var textArea = document.querySelector("#aside-text-area");
var searchBtn = document.querySelector("#search-button");
var popularCity = document.querySelectorAll("#la-events, #ny-events, #miami-events");
var displayVenues = document.querySelector("#venues");
var venueLocation = document.querySelector("#location-list");
var searchForm = document.querySelector("#searchEntry");
var searchInput = document.querySelector("#search");
/*
event.name
event.url
event.images[0] --do we want to render all the pics?
dates.start.localTime
dates.start.localDate
event.info
event.pleaseNote
event.priceRanges --It's an array 
*/
var displayEvents = [];

var cityEvents = function (events) {
    // var city = localStorage.getItem("city");
    // if (city) {
        // displayEvents = JSON.parse(city);
        // console.log(displayHistory)
        for (let i = 0; i < events.length; i++) {
            var currentEvent = events[i];
            displayVenues.classList.add("event");
            var card = document.createElement("div");
            card.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
            var figure = document.createElement("figure");
            var image = document.createElement("img");
            image.setAttribute("src", currentEvent.images[0].url);
            figure.append(image);
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body")
            var eventName = document.createElement("h2");
            eventName.textContent = currentEvent.name;
            eventName.classList.add("card-title");
            var info = document.createElement("p");
            info.textContent = currentEvent.info;
            var actions = document.createElement("div");
            var infoBtn = document.createElement("a");
            infoBtn.textContent = "Get Tickets";
            infoBtn.classList.add("btn", "btn-primary");
            infoBtn.setAttribute("href", currentEvent.url);
            infoBtn.setAttribute("target", "_blank")
            actions.append(infoBtn);
            cardBody.append(
                eventName,
                info,
                actions
            )
            card.append(figure, cardBody);
            venueLocation.append(card);
            // searchBtn.textContent = cityName;
            // searchBtn.dataset.city = cityName;

            // // searchBtn.addEventListener("click", function(event){
            //     console.log(event)
            //     var cityNamePull = event.target.dataset.city;
            //     console.log(cityName);
            //     placesTravel(cityNamePull);

            // // })
        }
    // }
}

function searchHandler(event) {
    event.preventDefault();
    var city = searchInput.value;
    console.log(city)
    placesTravel(city);
}

function placesTravel(city){
    var apiKey = "Efd8lGNsvYBNxWvkrSLfqqavEwDHSeey"
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${apiKey}`

    fetch(queryURL)
    .then(function(resp) { return resp.json()})
    .then(function(data) {
        var events = data._embedded.events;
        cityEvents(events);
        console.log(events)})
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
  searchForm.addEventListener("submit", searchHandler);