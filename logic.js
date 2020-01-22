// Define SVG area dimensions
var svgWidth = 450;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


var piechart = d3.csv("piechart_severity.csv")
piechart.then(function (data) {
    data.forEach(function(d) {
        d.Percentage = +d.Percentage;
        d.SeverityLevel = d.SeverityLevel;
    });

// Load data from hours-of-tv-watched.csv
var barchart = d3.csv("klean_csv.csv")
barchart.then(function (data) {
    data.forEach(function(d) {
        d.Severity = +d.Severity;
    })

//d3.csv("piechart_severity.csv").then(function(severityData) {

//   // Print the tvData
//   console.log(severityData);

//   // Cast the hours value to a number for each piece of tvData
//   severityData.forEach(function(data) {
//     data.Count = +data.Count;
//   });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

 // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (severityData.length - 1))) / severityData.length;

   // @TODO
  // Create code to build the bar chart using the tvData.
  svg.selectAll("rect")
    .data(severityData)
    .enter().append("rect")
    .attr("width", function(d) {
        return d * 10;
    })
    .attr("height", 50)
    .attr("x", 0)
    .attr("y", function(d,i) {
        return i * 60;
    });

}).catch(function(error) {
  console.log(error);
});
console.log(barchart)