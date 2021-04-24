console.log("app.js loaded");

function drawCharts(sampleId) {

    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var w_freq = data.metadata.map(d => d.w_freq)
        console.log(` Washing Frequency : ${w_freq}`)

        var samples = data.samples;
        console.log(samples);

		var resultArray = samples.filter(s => s.id.toString() == sampleId);
        
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
			margin: {
                t: 30, 
                l: 150,
                r: 30,
                b: 30
            
            }
		}
		
		Plotly.newPlot("bar", barArray, barLayout);

        // create the bubble chart

        //var samples_bubble = data.samples_bubble.filter(s => s.id.toString() === id)[0];


        var bubbleData = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        // set the layout for the bubble plot
        var layout_bubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // create the data variable 
        var data_bubble = [bubbleData];

        // create the bubble plot
        Plotly.newPlot("bubble", data_bubble, layout_bubble); 

         // create guage chart
  
         var data_guage = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(w_freq),
            title: { text: `Weekly Washing Frequency ` },
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      { range: [0, 2], color: "grey" },
                      { range: [2, 4], color: "red" },
                      { range: [4, 6], color: "yellow" },
                      { range: [6, 8], color: "blue" },
                      { range: [8, 9], color: "green" },
                    ]}
                
            }
          ];
          var layout_guage = { 
              width: 700, 
              height: 600, 
              margin: { t: 20, b: 40, l:100, r:100 } 
            };


          Plotly.newPlot("gauge", data_guage, layout_guage);





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
