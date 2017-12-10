function getColumn(data, column_name){
    var column = [];
    data.forEach(function(item){
        column.push(item[column_name]);
    })
    return column;
}

function scatterPlot(){
    var data = [{
        x: [],
        y: [],
        type: 'bar'
    }];

    data2017.forEach(function(item){
        data[0].x.push(item.Country);
        data[0].y.push(item.Happiness_Score);
    });

    var layout = {
        title: 'Line and Scatter Plot',
        autosize: true
    };

    Plotly.newPlot('myDiv', data);
}

function scatterMatrixPlot(){
    var columns = ["Economy_GDP", "Health_Life_Expectancy","Freedom"];
    var interval = 0.9/columns.length;
    var space = 0.1/columns.length;
    var data = [];
    var layout = {
        title: 'Matriz Scatterplot',
        xaxis: { domain: [0, interval - space] },
        yaxis: { domain: [1 - interval + space, 1], title: columns[0] },
        showlegend: false,
        //autosize: false,
        height: 900
    }

    for(var i = 0; i < columns.length; i++){
        for(var j = 0; j < columns.length; j++){
            var trace = {
                x: getColumn(data2017, columns[i]),
                y: getColumn(data2017, columns[j]),
                mode: 'markers',
                type: 'scatter',
                text: getColumn(data2017, "Country"),
                showtext: false,
                marker: {
                    //size: 40,
                    color: getColumn(data2017, "Happiness_Score"),
                    autocolorscale: false,
                    showscale: true
                },
                //name: getColumn(data2017, "Country")
            }
            var count = (columns.length * i) + j + 1;
            if(count != 1){
                trace['xaxis'] = 'x' + count;
                trace['yaxis'] = 'y' + count;
                layout['xaxis' + count] = {
                    domain: [j*interval, (j+1) * interval - space],
                    anchor: 'y' + count
                };
                layout['yaxis' + count] = {
                    domain: [1 - ((i + 1) * interval) + space, 1 - (i * interval)],
                    anchor: 'x' + count
                };
            }
            if(j == 0 && count != 1){
                layout['yaxis' + count].title = columns[i];
            }
            if(i == columns.length-1){
                layout['xaxis' + count].title = columns[j];                
            }
            data.push(trace);
        }
    }
    console.log(data);
    Plotly.newPlot('scatterMatrixDiv', data, layout);
}

function mapPlot(){
    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: [],
        z: [],
        text: [],
        autocolorscale: false
    }];

    data2017.forEach(function(item){
        data[0].locations.push(item.Country);
        data[0].text.push(item.Country);
        data[0].z.push(item.Happiness_Score);
    });

    var layout = {
        title: 'Mapa do coeficiente de felicidade',
        geo: {
            projection: {
                type: 'robinson'
            }
        },
        height: 600
    };

    Plotly.plot(mapDiv, data, layout, { showLink: false });
}

function parallelPlot(){
    getColumn(data2017, "Country");
    var data = [{
        type: 'parcoords',
        pad: [80, 80, 80, 80],
        line: {
            color: [],
            colorscale: 'Rainbow',
            showscale: true
        },

        dimensions: [{
            range: [0, 10],
            label: 'Happiness Score',
            values: getColumn(data2017, "Happiness_Score")
        }, {
            constraintrange: [5, 6],
            range: [0, 2],
            label: 'Economy GDP',
            values: getColumn(data2017, "Economy_GDP")
        }, {
            label: 'Life Expectancy',
            range: [0, 1],
            values: getColumn(data2017, "Health_Life_Expectancy")
        }, {
            label: 'Freedom',
            range: [0, 1],
            values: getColumn(data2017, "Freedom")
        },
        {
            label: 'Generosity',
            range: [0, 1],
            values: getColumn(data2017, "Generosity")
        }]
    }];

    data2017.forEach(function(item){
        var continent = countries[item.Country].Continent;
        data[0].line.color.push(getContinentIndex(continent));
    });

    var layout = { title: 'Coordenadas paralelas' };

    Plotly.plot('parallelDiv', data, layout);
}