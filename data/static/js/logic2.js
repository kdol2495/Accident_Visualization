//chart.js plotting 
var url = "http://127.0.0.1:5000/api/v1.0/horizontal_bar";

var MeSeContext = document.getElementById("myChart").getContext("2d");

d3.json(url, function (d) {
    console.log('data', d);
    // console.log("hello");

    var test_var = {
        data: d.map(e => e['Count(Severity)'])
    }

    console.log('test', test_var);

    makeChart(d);
});

function makeChart(parseData) {
    //this takes our json data and returns an array of the counts of severity
    // var severityData = data.map(function (d) {
    //     return d["Count(Severity)"]
    // });
    var newdata = parseData.forEach(function (d) {
        console.log(d)
    });
    
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
                        max: 300000// Edit the value according to what you need
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }

        },
        labels: [0,1,2,3,4],
        datasets: [
            {
                data: parseData
            }
        ]
    });
};
