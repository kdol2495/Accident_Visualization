//chart.js plotting 
var url = "http://127.0.0.1:5000/api/v1.0/city_bar";

var MeSeContext = document.getElementById("myChart3").getContext("2d");

d3.json(url, function (d) {
    console.log('data', d);
    // console.log("hello");

    var test_var = {
        'data': d.map(e => e['Count(city)'])
    };
    console.log('test', test_var.data[0]);

    var chart = new Chart(MeSeContext, {
        type: 'horizontalBar',
        data: {
          labels: ["0", "1", "2", "3", "4"],
          datasets: [
            {
              label: "City",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: test_var.data
            }
          ]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Number of Accidents by City'
          }
        }
    });
});