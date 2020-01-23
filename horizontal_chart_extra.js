var MeSeContext = document.getElementById("myChart").getContext("2d");
// var MeSeData =  {
//     labels: [
//         "1",
//         "SE",
//         "LOL"
//     ],
//     datasets: [
//         {
//             label: "Test",
//             data: [100, 75, 65],
//             backgroundColor: ["#669911", "#119966" ],
//             hoverBackgroundColor: ["#66A2EB", "#FCCE56", ]
//         }]
// };

// d3.csv('klean_csv1.csv')
//   .then(makeChart);

// function makeChart(players) {
//   var chart = new Chart('chart', {
//     type: 'horizontalBar',
//     data: {
//       labels: ['1', '2', '3'],
//       datasets: [
//         {
//           data: [10, 20, 30]
//         }
//       ]
//     }
//   });
// }



function makeChart(severity) {
    // players is an array of objects where each object is something like:
    // {
    //   "Name": "Steffi Graf",
    //   "Weeks": "377",
    //   "Gender": "Female"
    // }


    var weeksData = severity.forEach(function (d) {
        return +d.Severity;
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
                        min: 0 // Edit the value according to what you need
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }

        },
        labels: [1, 2, 3, 4],
        datasets: [
            {
                data: weeksData
            }
        ]
    });

// Request data using D3
d3.csv("klean_csv1.csv").then(makeChart);





    // var MeSeChart = new Chart(MeSeContext, {
    //     type: 'horizontalBar',
    //     data: MeSeData,
    //     options: {
    //         scales: {
    //             xAxes: [{
    //                 ticks: {
    //                     min: 0 // Edit the value according to what you need
    //                 }
    //             }],
    //             yAxes: [{
    //                 stacked: true
    //             }]
    //         }
    //     }
    // });
