function scatterPlot(){
    /*var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers'
    };

    var trace2 = {
        x: [2, 3, 4, 5],
        y: [16, 5, 11, 10],
        mode: 'lines'
    };

    /*var trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers'
    };*/

    var data = [{
        x: [],
        y: [],
        type: 'bar'
    }];

    data2017.forEach(function(item){
        data[0].x.push(item.Country);
        data[0].y.push(item.Happiness_Rank);
    })

   

    var layout = {
        title: 'Line and Scatter Plot',
        autosize: true
    };

    Plotly.newPlot('myDiv', data);
}
