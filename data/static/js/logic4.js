//chart.js plotting 
var url = "http://127.0.0.1:5000/api/v1.0/state_bar";

var MeSeContext = document.getElementById("myChart4").getContext("2d");

d3.json(url, function (d) {
    console.log('data', d);
    // console.log("hello");

    var test_var = {
        'data': d.map(e => e['Count(State)'])
    };
    console.log('test', test_var.data[0]);

    var chart = new Chart(MeSeContext, {
        type: 'horizontalBar',
        data: {
          labels: ["Austin", "Dallas", "Fort Worth", "Houston", "Los Angeles",
           "Oakland", "Sacramento", "San Antonio", "San Diego", "San Jose"],
          datasets: [
            {
              label: "State",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: test_var.data
            }
          ]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Number of Accidents by State'
          }
        }
    });
});