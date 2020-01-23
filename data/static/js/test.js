//modified 
// Store our API endpoint inside queryUrl
//var url = "/static/data/data.csv";
var url = "http://127.0.0.1:5000/api/v1.0/map_data";
url_all = "http://127.0.0.1:5000/api/v1.0/all_accidents";
console.log(url);

//create an empty array that will hold arrays of the lat, lng, and intensity for each earthquake 
var heatpoints = []

// Create a new marker cluster group
var markers = L.markerClusterGroup();

// somefunction();
//Perform a GET request to the query URL
d3.json(url, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    //console.log(data);
    console.log("loading all cities")
    createFeatures(data);
    //populatetable(data);
    
});

//INPUT #1
//create city input field reference


//this function pans the map to the specific city
function center_map(city)
{
    if(city=="San Jose")
    {
        map.panTo(new L.LatLng(37.3382, -121.8863));
    }

    if(city=="Oakland")
    {
        map.panTo(new L.LatLng(37.8044, -122.2712));
    }
    if(city=="Sacramento")
    {
        map.panTo(new L.LatLng(38.5816, -121.4944));
    }

    if(city=="Los Angeles")
    {
        map.panTo(new L.LatLng(34.0522, -118.2437));
    }
    if(city=="San Diego")
    {
        map.panTo(new L.LatLng(32.7157, -117.1611));
    }


    if(city=="San Antonio")
    {
        map.panTo(new L.LatLng(29.4241, -98.4936));
    }

    if(city=="Austin")
    {
        map.panTo(new L.LatLng(30.2672, -97.7431));
    }

    if(city=="Houston")
    {
        map.panTo(new L.LatLng(29.7604, -95.3698));
    }

    if(city=="Fort Worth")
    {
        map.panTo(new L.LatLng(32.7555, -97.3308));
    }
}


d3.json(url_all, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    populatetable(data);
});

function createFeatures(accidentData) {
    // Pull the "stations" property off of response.data
    var accidentMarkers = [];
    //console.log(accidentData["Start_Time"]);
    

    for (var index = 0; index < accidentData.length; index++) {
        //create an accident marker that 
        var accident = accidentData[index];
        var accident_lat = accident['Start_Lat'];
        var accident_lng = accident['Start_Lng'];
        var accidentMarker = L.marker([accident_lat, accident_lng]);
        // console.log("accident marker # " +index);
        // console.log(accidentMarker);


        // Add the marker to the bikeMarkers array
        accidentMarkers.push(accidentMarker);
        markers.addLayer(accidentMarker);
    }
    createMap(L.layerGroup(accidentMarkers));
}





function createMap(accidentMarkers, center_coord) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Accident Points (Not Recommended Due to Performance)": accidentMarkers,
        "Marker Clusters": markers
    };

    // Create the map object with options
    window.map = L.map("map", {
        center: [32.7555, -97.3308],
        zoom: 12,
        //by default, we only use marker groups
        layers: [lightmap, markers]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function somefunction() {
    element = document.getElementById('city');
    console.log(element);
    if (element != null) 
    {
        var chosenValue = d3.select('city').property('value');
        // console.log(chosenValue);
        url = "localhost:5000/submitted/";
        d3.json(url, function(d) 
        {
            createFeatures(d);
            console.log(d);
        })
    }    
    else
    {
        console.log("bad data");
    }
}

function populatetable(filtered)
    {
            // Get a reference to the table body
            var tbody = d3.select("tbody");

            //remove old data
            rows = tbody.selectAll("tr").remove();

            //itereate through filtered data
            filtered.forEach(function(ufoSights) {
                //console.log(ufoSights);
                var row = tbody.append("tr");
                Object.entries(ufoSights).forEach(function([key, value]) 
                {
                    //console.log(key, value);
                    // Append a cell to the row for each value
                    // in the weather report object
                    var cell = row.append("td");
                    cell.text(value);
    			});
    		});

    }


    function handleClick()
    {
        console.log("Clicked");
        event.preventDefault();
        var chosenValue = d3.select('#city').node().value;
        console.log(chosenValue);
        center_map(chosenValue);

    
    
    }
    var button = d3.select("#button");
    button.on("click", handleClick);

