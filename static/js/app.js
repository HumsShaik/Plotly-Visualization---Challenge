console.log("app.js loaded");

function drawCharts(sampleId) {

    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var samples = data.samples;
		var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);

		var result = resultArray[0];
        console.log(result);

        var otu_ids = result.otu_ids;
        console.log(otu_ids);

        var otu_labels = result.otu_labels;
        console.log(otu_labels);

        var sample_values = result.sample_values;
		console.log(sample_values);

        yticks = otu_ids.slice(0,10).map(otu_Id => `OTU ${otu_Id}`).reverse();
		
		var barData = {
			x: sample_values.slice(0,10).reverse(),
			y: yticks,
			type: "bar",
			text: otu_labels.slice(0,10).reverse(),
			orientation: "h"
		}
        var barArray = [barData];
		
		var barLayout = {
			title: "Top 10 Bacteria Cultures Found",
			margin: {t: 30, l: 150}
		}
		
		Plotly.newPlot("bar", barArray, barLayout);

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
     drawCharts(id);



    });

}

init();
