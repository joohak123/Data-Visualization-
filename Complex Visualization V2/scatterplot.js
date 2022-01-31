var open = d3.csv("merged.csv"); //open the file and save it to a variable that way we can reuse it w/o opening

function sortFunction(a, b) { //sorting function for my data arr ay
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1; // > will return highest to lowest , < will return 
    }
}

function create(){

    d3.select("svg").selectAll("*").remove(); //to remove the already existing graph
    let radio1 = document.getElementsByName("x"); //save the value of the drag down menu
    let radio2 = document.getElementsByName("y");

    var choice2;
    var choice;
    for(let i = 0; i < radio1.length; i++){
        if(radio1[i].checked){
            choice = radio1[i].value;
        }
        if(radio2[i].checked){
            choice2 = radio2[i].value;
        }
    }
    document.getElementById("result").innerHTML = ""

    if(choice == undefined || choice2 == undefined){
        document.getElementById("result").innerHTML = "Please choose the two variables";
        return; 
    }
    if(choice == choice2){
        document.getElementById("result").innerHTML = "Same variable please choose two different ones";
        return;
    }

    var svg = d3.select("svg"), margin = 200
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

    open.then(function(data){
        
        var yLabel;
        var xLabel;
        var newData = [];

        
        var xScale = d3.scaleLinear().range([0, width]);
            yScale = d3.scaleLinear().range([height,0]);

        if(choice == "population"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.population;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Population";
        }
        else if (choice == "inflationRate"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.inflationRate;
                if(value > 100){
                    value = 0;
                }
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Inflation Rate (%)";
        }
        else if (choice == "birthPer1000"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.birthPer1000;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Birth Per 1000";
        }
        else if (choice == "deathPer1000"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.deathPer1000;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Death Per 1000";
        }
        else if (choice == "GDPPerCapita"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.GDPPerCapita;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "GDP Per Capita";
        }
        else if (choice == "militaryExpenditures"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.militaryExpenditures;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Military Spending (% per GDP)";
        }
        else if (choice == "laborForce"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.laborForce;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "Labor Force";
        }
        else if (choice == "GDPGrowthRate"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.GDPGrowthRate;
                newData[i] = [];
                newData[i][0] = value;
            }
            xLabel = "GDP GRowth Rate (%)";
        }
        

        if(choice2 == "population"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.population;
                newData[i][1] = value;
            }
            yLabel = "Population";
        }
        else if (choice2 == "inflationRate"){
            // yScale.domain([d3.min(data, function(d) {if (+d.inflationRate !== 0) {return +d.inflationRate;}}),
            //     d3.max(data, function(d) {if (+d.inflationRate !== 0) {return +d.inflationRate;}})
            // ])
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.inflationRate;
                if(value > 100){
                    value = 0;
                }
                newData[i][1] = value;
            }
            yLabel = "Inflation Rate (%)";
        }
        else if (choice2 == "birthPer1000"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.birthPer1000;
                newData[i][1] = value;
            }
            yLabel = "Birth Per 1000";
        }
        else if (choice2 == "deathPer1000"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.deathPer1000;
                newData[i][1] = value;
            }
            yLabel = "Death Per 1000";
        }
        else if (choice2 == "GDPPerCapita"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.GDPPerCapita;
                newData[i][1] = value;
            }
             yLabel = "GDP Per Capita";
        }
        else if (choice2 == "militaryExpenditures"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.militaryExpenditures;
                newData[i][1] = value;
            }
            yLabel = "Military Spending (% per GDP)";
        }
        else if (choice2 == "laborForce"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.laborForce;
                newData[i][1] = value;
            }
            yLabel = "Labor Force";
        }
        else if (choice2 == "GDPGrowthRate"){
            for(let i = 0; i< data.length; i++){
                let obj = data[i];
                let value = +obj.GDPGrowthRate;
                newData[i][1] = value;
            }
            yLabel = "GDP GRowth Rate (%)";
        }
        svg.append("text") //add a text for title
        .attr("transform", "translate(100,0)")
        .attr("x", 200) //larger the ## more to the right
        .attr("y", 50) // larget the ## more to the bottom
        .attr("font-size", "24px")
        .text(xLabel + " vs " + yLabel);

        let xmin = d3.min(newData , d => d[0]);
        let ymin = d3.min(newData , d => d[1]);
        let xmax = d3.max(newData, d => d[0]);
        let ymax = d3.max(newData, d => d[1]);
        
        xScale.domain([xmin , xmax]);
        yScale.domain([ymin , ymax]);

        //var axis = d3.axisBottom().scale(xScale).ticks();
        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 300)
         .attr("stroke", "black")
         .text(xLabel)

        g.append("g")
         .call(d3.axisLeft(yScale))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 5)
         .attr("dy", "-8.1em")
         .attr("dx", "-10em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text(yLabel)
        
        g.selectAll(".circle")
         .data(newData)
         .enter().append("circle")
         .attr("r", function(d) {if (d[0] !== 0 && d[1] !== 0){return 2;};})
         .attr("cx", function(d) {if (d[0] !== 0 && d[1] !== 0){return xScale(d[0]);};})
         .attr("cy", function(d) {if (d[0] !== 0 && d[1] !== 0){return yScale(d[1]);};})
         .style("fill", "red")
    });

}