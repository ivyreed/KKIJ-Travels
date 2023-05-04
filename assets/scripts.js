// main variables
var textArea = document.querySelector("#aside-text-area");
var searchBtn = document.querySelector("#search-button");
var displayVenues = document.querySelector("#venues");
var venueLocation = document.querySelector("#location-list");
var searchForm = document.querySelector("#searchEntry");
var searchInput = document.querySelector("#search");
var locationList = document.querySelector("#location-list");

// variables to display events from the Ticketmaster API
var displayEvents = [];
var allEvents = [];

// function to display event information from the Ticketmaster API
var cityEvents = function (events) {
    var city = localStorage.getItem("city");
    if (city) {
        displayEvents = JSON.parse(city);
        for (let i = 0; i < events.length; i++) {
            var currentEvent = events[i];
            allEvents.push(currentEvent);
            displayVenues.classList.add("event");
            var card = document.createElement("div");
            card.classList.add("card", "w-96", 'xl:w-1/5', 'xl:mx-2', "bg-base-100", "shadow-xl",'md:mb-24', 'mt-4', 'mb-32');
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
        }
        searchForm.addEventListener("submit", searchHandler);
    }
    localStorage.setItem("city", JSON.stringify(allEvents));
}
var displayStoredEvents = function() {
    var storedEvents = localStorage.getItem("city");
    if (storedEvents) {
        displayEvents = JSON.parse(storedEvents);
        cityEvents(displayEvents);
        venueLocation.innerHTML = "";
}}
displayStoredEvents();

// function that shows events based on the city typed in the search bar 
function searchHandler(event) {
    event.preventDefault();
    var city = searchInput.value;
    placesTravel(city);
}

// function that pulls information from the Ticketmaster API
function placesTravel(city){
    var apiKey = "Efd8lGNsvYBNxWvkrSLfqqavEwDHSeey"
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${apiKey}`

    fetch(queryURL)
    .then(function(resp) { return resp.json()})
    .then(function(data) {
        var events = data._embedded.events;
        venueLocation.innerHTML = "";
        cityEvents(events);
    })
}

// variables to add functionality to main city buttons 
  var lasVegas = document.querySelector('#las-vegas')
  var newYork = document.querySelector('#new-york')
  var miami = document.querySelector('#miami')
  var losAngeles = document.querySelector('#los-angeles')
  var lasVegas2 = document.querySelector('#las-vegas-2')
  var newYork2 = document.querySelector('#new-york-2')
  var miami2 = document.querySelector('#miami-2')
  var losAngeles2 = document.querySelector('#los-angeles-2')

// functions and event listeners that allow that city to be ran once clicked
  function lasVegasEvents(event) {
    event.preventDefault();
    var city = "las vegas"
    placesTravel(city);
}
  lasVegas.addEventListener('click', lasVegasEvents)
  lasVegas2.addEventListener('click', lasVegasEvents)
  
  function newYorkEvents(event) {
    event.preventDefault();
    var city = "new york"
    placesTravel(city);
}
  newYork.addEventListener('click', newYorkEvents)
  newYork2.addEventListener('click', newYorkEvents)
  
  function miamiEvents(event) {
    event.preventDefault();
    var city = "miami"
    placesTravel(city);
}
  miami.addEventListener('click', miamiEvents)
  miami2.addEventListener('click', miamiEvents)
  
  function losAngelesEvents(event) {
    event.preventDefault();
    var city = "los angeles"
    placesTravel(city);
}
  losAngeles.addEventListener('click', losAngelesEvents)
  losAngeles2.addEventListener('click', losAngelesEvents)
  
  searchInput.addEventListener("input", getCity);

// This loops through an obtains each city with the same name and appends it as text to the HTML document. 
function loop(result) {
    var results = document.querySelector('#autocomplete')
    results.innerHTML = '';
    var cityList = document.createElement("ul");
    cityList.setAttribute('id', 'city-name');
    for( var i=0; i < result.features.length; i++){
        if (result.features[i].properties.city != undefined) {
            var li = document.createElement('li')
            li.classList.add('pb-2', 'px-2')
            var city = result.features[i].properties.city;
            var state = result.features[i].properties.state;
            var liBtn = document.createElement("button");
            liBtn.setAttribute('id', i)
            liBtn.addEventListener('click', function(){
              searchInput.value = '';
              results.innerHTML = '';
               placesTravel(this.textContent);
            } )
            liBtn.classList.add("text-neutral-content", 'hover:text-warning-content');
            liBtn.innerText = `${city}, ${state}`; 
            li.appendChild(liBtn)
            results.appendChild(li);
        }
    }
}

// function to get information from GeoApify API
function getCity(){
  var requestOptions = {
    method: 'GET',
  };
  let cur = searchInput.value
  if (!cur){
    return;
  }
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cur}&apiKey=dfc930689ca5445997b6dff21a5ff71b`, requestOptions)
    .then(response => response.json())
.then(result => {
    loop(result)})
}
searchForm.addEventListener("submit", searchHandler);

