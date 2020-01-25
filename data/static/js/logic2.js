//chart.js plotting 
var url = "http://127.0.0.1:5000/api/v1.0/horizontal_bar";

var MeSeContext = document.getElementById("myChart").getContext("2d");

d3.json(url, function (d) {
    console.log('data', d);
    // console.log("hello");

    var test_var = {
        'data': d.map(e => e['Count(Severity)'])
    };
    console.log('test', test_var.data[0]);

    var chart = new Chart(MeSeContext, {
        type: 'horizontalBar',
        data: {
          labels: ["0", "1", "2", "3", "4"],
          datasets: [
            {
              label: "Severity",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: test_var.data

            //   data: [3, 119, 198561, 91908, 2118]
            }
          ]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Severity by count'
          }
        }
    });
});
// var chart = new Chart(MeSeContext, {
//     type: 'horizontalBar',
//     data: {
//       labels: ["0", "1", "2", "3", "4"],
//       datasets: [
//         {
//           label: "Test",
//           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//           data: []
//         }
//       ]
//     },
//     options: {
//       legend: { display: true },
//       title: {
//         display: true,
//         text: 'Predicted world population (millions) in 2050'
//       }
//     }
// });
//     var chart = new Chart(MeSeContext, {
//         type: "line",
//         options: {
//             maintainAspectRatio: true,
//             legend: {
//                 display: true
//             },
//             scales: {
//                 xAxes: [{
//                     display: true,
//                     ticks: {
//                         min: 0,
//                         max: 300000// Edit the value according to what you need
//                     }
//                 }],
//                 yAxes: [{
//                     stacked: true
//                 }]
//             }
//         },
//         data: {
//             labels: ["0", "1", "2", "3", "4"],
//             datasets: [
//                 {
//                     label: "Severity Level Count",
//                     backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//                     data: test_var['Count(Severity)']
//                 }
//             ]
//         }
//     })
// });


// function makeChart(parseData) {
//     //this takes our json data and returns an array of the counts of severity
//     // var severityData = data.map(function (d) {
//     //     return d["Count(Severity)"]
//     // });
//     var newdata = parseData.forEach(function (d) {
//         console.log(d)
//     });

//     var chart = new Chart(MeSeContext, {
//         type: "horizontalBar",
//         options: {
//             maintainAspectRatio: true,
//             legend: {
//                 display: true
//             },
//             scales: {
//                 xAxes: [{
//                     ticks: {
//                         min: 0,
//                         max: 300000// Edit the value according to what you need
//                     }
//                 }],
//                 yAxes: [{
//                     stacked: true
//                 }]
//             }

//         },
//         labels: [0,1,2,3,4],
//         datasets: [
//             {
//                 data: 
//             }
//         ]
//     });
// };


//chart.js plotting 
var url2 = "http://127.0.0.1:5000/api/v1.0/city_bar";

var MeSeContext2 = document.getElementById("myChart3").getContext("2d");

d3.json(url2, function (d) {
    console.log('data', d);
    // console.log("hello");

    var test_var2 = {
        'data': d.map(e => e['Count(city)'])
    };
    console.log('test', test_var2.data[0]);

    var chart = new Chart(MeSeContext2, {
        type: 'horizontalBar',
        data: {
          labels: ["Austin", "Dallas", "Fort Worth", "Houston", "Los Angeles",
          "Oakland", "Sacramento", "San Antonio", "San Diego", "San Jose"],
          datasets: [
            {
              label: "City",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: test_var2.data
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