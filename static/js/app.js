console.log("app.js loaded");

function drawCharts(id) {

    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)


    });



}


// create the function for the change event
function optionChanged(id) {
    drawCharts(id);
    
}


function init() {

    console.log(" Init Dashboard()");
     // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
    
    var sampleNames = data.names;
    // get the id data to the dropdwown menu
    data.names.forEach(sampleId => {
        dropdown.append("option")
        .text(sampleId)
        .property("value", sampleId);
    });

    var id = sampleNames[0];
     // call the functions 
    });

}

init();
