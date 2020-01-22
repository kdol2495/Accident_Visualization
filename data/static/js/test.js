//modified 
// Store our API endpoint inside queryUrl
//var url = "/static/data/data.csv";
var url = "http://127.0.0.1:5000/api/v1.0/map_data";
console.log(url);

//create an empty array that will hold arrays of the lat, lng, and intensity for each earthquake 
var heatpoints = []

// Create a new marker cluster group
var markers = L.markerClusterGroup();


// Perform a GET request to the query URL
d3.json(url, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    //console.log(data);
    console.log("test3")
    createFeatures(data);
    
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





function createMap(accidentMarkers) {

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
    var map = L.map("map", {
        center: [37.7749, -122.4194],
        zoom: 12,
        //by default, we only use marker groups
        layers: [lightmap, markers]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}





