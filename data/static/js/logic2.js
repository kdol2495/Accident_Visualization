//chart.js plotting 
var url = "http://127.0.0.1:5000/api/v1.0/horizontal_bar";

var MeSeContext = document.getElementById("myChart").getContext("2d");

d3.json("url").then(makeChart);

function makeChart(severity) {
    var severityData = severity.map(function(d) {
        return +d.Severity
    });
    console.log(severityData);
    

    var chart = new Chart(MeSeContext, {
        type: "horizontalBar",
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0,
                        max: 1000 // Edit the value according to what you need
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }

        },
        labels: [1,2,3,4],
        datasets: [
            {
                data: severityData
            }
        ]
    });
};


