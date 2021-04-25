console.log("app.js loaded");

// *********************************************************
//  The code in these files is based on Dom's office hours
// *********************************************************

function drawCharts(sampleId) {

    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var w_freq = data.metadata.map(d => d.w_freq)
        console.log(` Washing Frequency : ${w_freq}`)

        var samples = data.samples;
        console.log(samples);
        
        //filtering sample values by id
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
		
        // ********************
        //   Create Bar Chart
        // ********************

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
		// create bar plot
		Plotly.newPlot("bar", barArray, barLayout);


        // **************************
        //  Create the Bubble Chart
        // **************************

        var bubbleData = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: "markers",
            marker: {
                size: result.sample_values,
                color: result.otu_ids
            },
            text: result.otu_labels

        };

        // set the layout for the bubble plot
        var bubbleLayout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // create the data variable 
        var data_bubble = [bubbleData];

        // create the bubble plot
        Plotly.newPlot("bubble", data_bubble, bubbleLayout); 

        // *********************
        //   Create Pie Chart 
        // *********************
        var pieData = {
            labels: yticks,
            values: sample_values,
            type:"pie",
          };
          
          var pieLayout = {
            height: 400,
            width: 500
          };
          
          var data = [pieData];
          
          // create Pie Plot
          Plotly.newPlot("pie", data, pieLayout);

        // *********************************
        //   Create Gauge Chart - Optional
        // *********************************
         
        var gaugeData = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(w_freq),
            type: "indicator",
            mode: "gauge",
            gauge: { axis: { range: [0, 9] },
                     steps: [
                      { range: [0, 1], color: "purple" },
                      { range: [1, 2], color: "red" },
                      { range: [2, 3], color: "yellow" },
                      { range: [3, 4], color: "blue" },
                      { range: [4, 5], color: "pink" },
                      { range: [5, 6], color: "grey" },
                      { range: [6, 7], color: "orange" },
                      { range: [7, 8], color: "lightblue" },
                      { range: [8, 9], color: "coral" },
                    ]
                }
                
            }
        ];

        
        var gaugeLayout = { 
              width: 600,
              title: { text: `<b> Belly Button Washing Frequency</b><br><br>Scrubs per Week ` }, 
              height: 600, 
              margin: { t: 30, b: 20, l:70, r:100 } 
              
              
        };

        

          // Create Gauge Plot
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
     
   });

}


// **************************************
// create the function to get metadata
// **************************************

function ShowMetadata(id) {
        // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info 
        var metadata = data.metadata;

        console.log(metadata)

        // filtering meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic Info to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}



// ******************************************
// create the function for the change event
// ******************************************

function optionChanged(id) {
    drawCharts(id);
    ShowMetadata(id);
}

// ************************
//  Create Init function
// ************************

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
     ShowMetadata(id);

    });

}

init();
