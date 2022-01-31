var open = d3.csv("mdsData.csv")
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']
var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions);

var columns = ["population", "laborForce", "GDPPurchasePower",  "electricityConsumption" ,"reservesOfForeignCurrency" , "birthPer1000" , "militaryExpenditures", "educationExpenditures"]


var margin = {top: 30, right: 30, bottom: 100, left: 60},
width = 600 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

var totalpopulation = 0;

var main = d3.csv("merged.csv")

function create(){
  var g2 = d3.select("#legend1") //pie chart
  .append("svg")
  .attr("width", 600 + margin.left + margin.right )
  .attr("height", 370 + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + 0 + "," + 0 + ")");
  
  var g3 = d3.select("#legend2") //MDS graph
  .append("svg")
  .attr("width", 784)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + 50 + "," + margin.top + ")");
  
  
  var g5 = d3.select("#legend3") //parallelcoordinate
  .append("svg")
  .attr("width", 900 + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + 32 + "," + 20 + ")");
  
  var g4 = d3.select("#legend4") //bar graph
  .append("svg")
  .attr("width", 800)
  .attr("height", 500)
  .append("g")
  .attr("transform",
  "translate(" + 32 + "," + 3 + ")");

  
  //creating parallel coordinate
  main.then(function(data){ 
    var yScale = {};
    //creating the yScale range + domain via tha order of correlation strength 
    yScale["population"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["population"] != 0) {return +d["population"];}})).range([height,0]).nice() //scaleLog for high numbers
    yScale["laborForce"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["laborForce"] != 0) {return +d["laborForce"];}})).range([height,0]).nice() 
    yScale["GDPPurchasePower"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["GDPPurchasePower"] != 0) {return +d["GDPPurchasePower"];}})).range([height,0]).nice() 
    yScale["electricityConsumption"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["electricityConsumption"] != 0) {return +d["electricityConsumption"];}})).range([height,0]).nice() 
    yScale["reservesOfForeignCurrency"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["reservesOfForeignCurrency"] != 0) {return +d["reservesOfForeignCurrency"];}})).range([height,0]).nice() 
    yScale["birthPer1000"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["birthPer1000"];})).range([height,0]) //scaleLinear for smaller numbers
    yScale["militaryExpenditures"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["militaryExpenditures"];})).range([height,0]) 
    yScale["educationExpenditures"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["educationExpenditures"];})).range([height,0]) 
    
    xScale = d3.scalePoint().range([0, 750]).domain(columns) //creating the xScale using range + doamin
    
    
    
    
    function path(d){
      return d3.line()(columns.map(function(p) { 
        var min =  d3.min(data, function(d) {if( +d[p] != 0){ return +d[p]}})
        var value = +d[p];
        if(min > value){ //checking if the value is less than min (aka Null value that I replaced w/ 0 )
          value = min;
        }
        var y = yScale[p](value) //assign y for the y coordinate using yScale 
        
        if(Number.isNaN(y)){ //checking if the value is a NaN
          y = yScale[p](min) + 0.01 //replace the value of y if it's a NaN
        }
        var x = xScale(p) // assign x for the x coordinate using xSacle
        return [x, y]; 
        
      }));
    }

    //to highlight the color of the path
    var highlight = function(d){
      
      selected_region = d.path[0].__data__.region
      var color_region = selected_region
      if(selected_region === "East Asia/Southeast Asia"){
        selected_region = "easia";
      }
      if(selected_region === "South Asia"){
        selected_region = "sasia";
      }
      if(selected_region === "North America"){
        selected_region = "namer";
      }
      if(selected_region === "South America"){
        selected_region = "samer";
      }
      if(selected_region === "Middle East"){
        selected_region = "meast";
      }
      if(selected_region === "Central Asia"){
        selected_region = "casia";
      }
      if(selected_region === "Australia - Oceania"){
        selected_region = "aus";
      }
      if(selected_region === "Central America"){
        selected_region = "camer";
      }

      // first every group turns grey
      g5.selectAll(".line")
        .transition().duration(25)
        .style("stroke", "lightgrey")
        .style("opacity", "0.2")

      //Second the hovered specie takes its color
      g5.selectAll("." + selected_region)
        .transition().duration(25)
        .style("stroke", color(color_region))
        .style("opacity", "1")
    }
   
    var highlightlegend = function(d){
      
      selected_region = d.path[0].__data__
      var color_region = selected_region
      if(selected_region === "East Asia/Southeast Asia"){
        selected_region = "easia";
      }
      if(selected_region === "South Asia"){
        selected_region = "sasia";
      }
      if(selected_region === "North America"){
        selected_region = "namer";
      }
      if(selected_region === "South America"){
        selected_region = "samer";
      }
      if(selected_region === "Middle East"){
        selected_region = "meast";
      }
      if(selected_region === "Central Asia"){
        selected_region = "casia";
      }
      if(selected_region === "Australia - Oceania"){
        selected_region = "aus";
      }
      if(selected_region === "Central America"){
        selected_region = "camer";
      }

      // first every group turns grey
      g5.selectAll(".line")
        .transition().duration(25)
        .style("stroke", "lightgrey")
        .style("opacity", "0.2")

      //Second the hovered specie takes its color
      g5.selectAll("." + selected_region)
        .transition().duration(25)
        .style("stroke", color(color_region))
        .style("opacity", "1")
    }
    var nohightlight = function(d){
      g5.selectAll(".line")
      .transition().duration(25)
      .style("stroke", function(d){return color(d.region)})
      .style("opacity", "0.5")
    }
    
    g5.selectAll("myPath") //drawing the path 
    .data(data)
    .enter()
    .append("path")
    .attr("class", function (d) {var name = d.region;
      if(d.region === "East Asia/Southeast Asia"){
        name = "easia";
      }
      if(d.region === "South Asia"){
        name = "sasia";
      }
      if(d.region === "North America"){
        name = "namer";
      }
      if(d.region === "South America"){
        name = "samer";
      }
      if(d.region === "Middle East"){
        name = "meast";
      }
      if(d.region === "Central Asia"){
        name = "casia";
      }
      if(d.region === "Australia - Oceania"){
        name = "aus";
      }
      if(d.region === "Central America"){
        name = "camer";
      }
      return "line " + name })
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function(d){ return color(d.region)}) //stroke based on color mapped with region + object's region
    .style("opacity" , 0.5)
    .on("mousemove", highlight)
    .on("mouseleave", nohightlight)
    
    g5.selectAll(".axis").data(columns).enter().append("g") //draw the x-Axis 
    .attr("transform" , function(d){
      return "translate(" + xScale(d) +")"
    })
    .each(function(d){
      d3.select(this).call(d3.axisLeft().scale(yScale[d]).ticks(5)) //give little ticks after it's scaled 
    })
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d})
    .style("fill", "black")


    var legend = g5.append("g")
      .attr("transform", "translate(800, 0)")
      .selectAll(".regions") //this is done to avoid already existing g element
      .data(regions);
      
      
    var region = legend.enter()
      .append("g")
      .classed("regions", true) //since we already added g element already
      .attr("transform", function(d, i) {
        return "translate(0," +(i + 1)* 25 +")"; //gap between the area
      });
      
    region.append("rect") //create the rectangle and fill the colors with it
      .attr("width",20)
      .attr("height",20)
      .attr("fill", function(d) {return color(d)})
      .on("mouseover", highlightlegend)
      .on("mouseleave", nohightlight)
      
    region.append("text") //add the text next to the rectangle
      .text(function(d){ return d }) //write the text
      .attr("fill", "black") //color the text
      .attr("x", 20)
      .attr("y", 15);
  })
  
  //creating pie chart
  main.then(function(data){
    
    
    var newData; 
    var title;
    var smallerData;
    var numberData;
    //find the % of the population 
    newData = d3.rollups(data, v=> d3.sum(v, d=> +d.population), d => d.region); //creates an 2d array with 0 index being region, 1st index being population (sums up all the same region)
    title = "Total Population of the World";
    newData.sort(sortFunction);
    smallerData= this.change(newData);
    
    //to get the pure number instead of %
    numberData = d3.rollups(data, v=> d3.sum(v, d=> +d.population), d => d.region);
    numberData.sort(sortFunction);

    let small_numberData = [];
    let total = 0;
    for(let i = 0; i< numberData.length; i++){
      datum = numberData[i];
      if( i <= 5){
        small_numberData[i] = datum;
        total += datum[1];
      }
      else{
        small_numberData[5][0] = "others";
        small_numberData[5][1] += datum[1];
        total += datum[1];
      }
    }
    
    var color = d3.scaleOrdinal()
    .domain(smallerData)
    .range(d3.schemeSet2);
    
    var pieData = d3.pie().value(function(d) { return d[1]})(smallerData); //convert the data for pie
    
    
    g2.append("text") //add a text for title
    .attr("transform", "translate(100,0)")
    .attr("x", 0) //larger the ## more to the right
    .attr("y", 30) // larget the ## more to the bottom
    .attr("font-size", "24px")
    .text(title);
    
    var segments = d3.arc().innerRadius(0) //helps to build arcs 
    .outerRadius(200)
    .padAngle(.05)
    .padRadius(50)
    
    var sections = g2.append("g")
    .attr("transform", "translate(250, 250)") //transform the data
    .selectAll("path").data(pieData); //append path to the data 
    

    NumberFormat = new Intl.NumberFormat('en-US') //to format , int int

    var mouseScroll = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

    sections.enter().append("path") //append path 
    .attr("d", segments) // with the segments above
    .attr("fill", function(d) {  //fill the color w/ index of i of colors
      return color(d.data[1]);})
    .on("mousemove", function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', '.5');
      mouseScroll.style("display","none");
      mouseScroll.transition()
      .duration(50)
      .style("opacity", 1);
      let num = d.path[0].__data__.data[1] * totalpopulation / 100
      num = parseInt(num)
      num = NumberFormat.format(num)
      mouseScroll.html(d.path[0].__data__.data[0]+  "<br>" + num)
      .style("left", d3.pointer(event)[0]+ 100 + "px")
      .style("top",  d3.pointer(event)[1] + 200+ "px")
      .style("display", "block")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', '1')
      mouseScroll.transition()
           .duration('50')
           .style("opacity", 0);
    })
    
    
      
    var text = g2.select("g").selectAll("text") //create a text to fill in the numbers
      .data(pieData);
      
    text.enter()
    .append("text")
    .attr("transform", function(d) { //this was onde to transform the number while rotating
      var midAngle = d.endAngle < Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ; //equation for the angle
      return "translate(" + segments.centroid(d) + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")"; }) //had to google to get the equation
    .attr("dy", ".35em") //move the text a bit down
    .attr('text-anchor','middle')
    .text(function(d) { return parseFloat((d.data[1]).toFixed(3)) + "%"});
        
    var legend = g2.append("g")
      .attr("transform", "translate(450, 300)")
      .selectAll(".regions") //this is done to avoid already existing g element
      .data(pieData);
      
      
    var region = legend.enter()
      .append("g")
      .classed("regions", true) //since we already added g element already
      .attr("transform", function(d, i) {
        return "translate(0," +(i + 1)* 30 +")"; //gap between the area
      });
      
    region.append("rect") //create the rectangle and fill the colors with it
      .attr("width",20)
      .attr("height",20)
      .attr("fill", function(d) {return color(d.data[1]);})
      
    region.append("text") //add the text next to the rectangle
      .text(function(d){ return d.data[0];}) //write the text
      .attr("fill", function(d) {return color(d.data[1]);}) //color the text
      .attr("x", 30)
      .attr("y", 15);
  })
      
      //create MDS plot using G2 (top left)
  open.then(function(data){ 
    
    //create MDS plot
    var xMin = d3.min(data, (function(d) { return +d.P1}))
    var xMax = d3.max(data, (function(d) { return +d.P1}))
    var yMin = d3.min(data, (function(d) { return +d.P2}))
    var yMax = d3.max(data, (function(d) { return +d.P2}))
    
    
    var x = d3.scaleLinear().range([0,width]).domain([xMin, xMax]).nice()
    
    var y = d3.scaleLinear().range([height,0]).domain([yMin, yMax]).nice()
    
    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y)
    
    g3.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .attr("font-size", "24px")
    .attr("text-anchor", "middle")
    .text("");
    
    g3.append("text") //add a text for title
    .attr("transform", "translate(100,0)")
    .attr("x", 0) //larger the ## more to the right
    .attr("y", 14) // larget the ## more to the bottom
    .attr("font-size", "20px")
    .text("MDS plot");

    g3.append("g")
    .attr("transform", "translate(" + x(0) + ",0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("PC2");
    

    
    g3.selectAll(".circle").data(data).enter()
    .append("circle")
    .attr("cx", function(d){return x(+d.P1)})
    .attr("cy", function(d){return y(+d.P2)})
    .attr("r", 3)
    .style("fill", function(d){return color(d.region)})
   
    
    d3.select("#legend5") //creating the legend at the HTML legend section 
    .append("svg")
    .attr("width", 150)
    .attr("height", 250)
    .selectAll(".legends")
    .data(regions);
    

    var legend = g3.append("g")
      .attr("transform", "translate(600, 0)")
      .selectAll(".regions") //this is done to avoid already existing g element
      .data(regions);
      
      
    var region = legend.enter()
      .append("g")
      .classed("regions", true) //since we already added g element already
      .attr("transform", function(d, i) {
        return "translate(0," +(i + 1)* 25 +")"; //gap between the area
      });
      
    region.append("rect") //create the rectangle and fill the colors with it
      .attr("width",20)
      .attr("height",20)
      .attr("fill", function(d) {return color(d)})
      
    region.append("text") //add the text next to the rectangle
      .text(function(d){ return d }) //write the text
      .attr("fill", "black") //color the text
      .attr("x", 20)
      .attr("y", 15);
  })

//Scatter plot gdp vs population
  main.then(function(data){ // scatterplot
        
    var yLabel;
    var xLabel;
    var newData = [];
    width = 600
    height = 340

    var xScale = d3.scaleLinear().range([0, width]);

    yScale = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["population"] != 0) {return +d["population"];}})).range([height,13]).nice()

    for(let i = 0; i< data.length; i++){
        let obj = data[i];
        let value = +obj.GDPPerCapita;
        newData[i] = [];
        newData[i][0] = value;
        newData[i][2] = obj.region;
        newData[i][3] = obj.name
    }
    xLabel = "GDP Per Capita";
    
    for(let i = 0; i< data.length; i++){
        let obj = data[i];
        let value = +obj.population;
        newData[i][1] = value;
    }
    yLabel = "Population";

  
    g4.append("text") //add a text for title
    .attr("transform", "translate(100,0)")
    .attr("x", 0) //larger the ## more to the right
    .attr("y", 14) // larget the ## more to the bottom
    .attr("font-size", "20px")
    .text(xLabel + " vs " + yLabel);

    let xmin = d3.min(newData , d => d[0]);
    let xmax = d3.max(newData, d => d[0]);
    
    xScale.domain([xmin , xmax]);

    g4.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
     .append("text")
     .attr("y", height - 310)
     .attr("x", width - 300)
     .attr("stroke", "black")
     .text(xLabel)

    g4.append("g")
     .call(d3.axisLeft(yScale).ticks(5))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 60)
     .attr("dy", "-8.1em")
     .attr("dx", "-10em")
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text(yLabel)
    

     var scatterMouse = d3.select("body").append("div") //for the mouse tooltip
     .attr("class", "tooltip")
     .style("opacity", 0)

     NumberFormat = new Intl.NumberFormat('en-US')

    g4.selectAll(".circle")
     .data(newData)
     .enter().append("circle")
     .attr("r", function(d) {if (d[0] !== 0 && d[1] !== 0){return 3;};})
     .attr("cx", function(d) {if (d[0] !== 0 && d[1] !== 0){return xScale(d[0]);};})
     .attr("cy", function(d) {if (d[0] !== 0 && d[1] !== 0){return yScale(d[1]);};})
     .style("fill", function(d){return color(d[2])})
     .on("mousemove", function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', 2)
           .attr("r", 7)
           .style("fill", "black")

      scatterMouse.transition()
      .duration(50)
      .style("opacity", 1);
      scatterMouse.html("name: " + d.path[0].__data__[3] + "<br>" + 
      "GDP: $" + NumberFormat.format(d.path[0].__data__[0]) + "<br>" + 
      "population: " + NumberFormat.format(d.path[0].__data__[1]) + "<br>"+ 
      "region: " + d.path[0].__data__[2])
      .style("left",  1450 + "px")
      .style("top",   500 + "px")
      .style("display", "block")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', '1')
           .attr("r", 3)
           .style("fill", function(d){return color(d[2])})
      scatterMouse.transition()
           .style("opacity", 0);
    })

     var legend = g4.append("g")
      .attr("transform", "translate(630, 20)")
      .selectAll(".regions") //this is done to avoid already existing g element
      .data(regions);
      
      
    var region = legend.enter()
      .append("g")
      .classed("regions", true) //since we already added g element already
      .attr("transform", function(d, i) {
        return "translate(0," +(i + 1)* 25 +")"; //gap between the area
      });
      
    region.append("rect") //create the rectangle and fill the colors with it
      .attr("width",20)
      .attr("height",20)
      .attr("fill", function(d) {return color(d)})
      
    region.append("text") //add the text next to the rectangle
      .text(function(d){ return d }) //write the text
      .attr("fill", "black") //color the text
      .attr("x", 20)
      .attr("y", 15);
  })
}



function sortFunction(a, b) { //sorting function for my data arr ay
  if (a[1] === b[1]) {
    return 0;
  }
  else {
    return (a[1] > b[1]) ? -1 : 1; // > will return highest to lowest , < will return 
  }
}

function change(newData){ //for the sum of data
  let smallerData = [];
  let total = 0;
  for(let i = 0; i< newData.length; i++){
    datum = newData[i];
    if( i <= 5){
      smallerData[i] = datum;
      total += datum[1];
    }
    else{
      smallerData[5][0] = "others";
      smallerData[5][1] += datum[1];
      total += datum[1];
    }
  }
  for(let i = 0; i< smallerData.length; i++){
    smallerData[i][1] = (smallerData[i][1] / total) * 100;
  }
  totalpopulation = total;
  return smallerData;
}

function avg(newData){ //for the sum of data
  let smallerData = [];
  for(let i = 0; i< newData.length; i++){
    datum = newData[i];
    if( i <= 5){
      smallerData[i] = datum;
    }
    else{
      smallerData[5][0] = "others";
      smallerData[5][1] += datum[1];
    }
  }
  smallerData[5][1] /= 5;
  console.log(smallerData[5][1])
  return smallerData;
}

function myData(newData){
  let smallerData = [];
  let i = 0;
  let total = 0;
  let temp = [];

  d3.count(newData, (d,i) => smallerData[i] = d);
  for(i = 0; i< smallerData.length; i++){ //remove key with undefined aka null data
    if(smallerData[i][0] == undefined){
      smallerData.splice(i);
    }
  }
  for(i = 0; i< smallerData.length; i++){
    if(smallerData[i][0] == undefined){
    }
    temp[i] = smallerData[i];
    temp[i][1] = smallerData[i][1].length;
    total += temp[i][1];
  }
  for(i = 0; i< smallerData.length; i++){
    temp[i][1] = temp[i][1] / total * 100;
  }
  smallerData = temp;
  return smallerData;

}
