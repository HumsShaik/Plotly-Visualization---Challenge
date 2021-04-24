console.log("app.js loaded");



function init() {

    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

    });

}

init();
