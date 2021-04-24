console.log("app.js loaded");

function drawCharts(id) {





}

function init() {
     // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

    // get the id data to the dropdwown menu
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });
     // call the functions 
    });

}

init();
