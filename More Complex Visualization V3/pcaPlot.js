var open = d3.csv("pcaData2.csv")
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']
var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions);

var eigenvalue = d3.csv("eigenvalueNum.csv")

//var PC1 = "population"
//var PC2 = "educationExpenditures"

var margin = {top: 30, right: 30, bottom: 100, left: 60},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var eigenvalueData = []

var columns = []

var col = []

eigenvalue.then(function(data){
   for(var i = 0; i < 8; i++){
      row = data[i]
      eigenvalueData[i] = []
      eigenvalueData[i][0] = row.variable
      eigenvalueData[i][1] = +row.eigenvalue
      columns[i] = row.variable
   }
})

console.log(columns)
console.log(col)

function create(){
  d3.select("#grid").selectAll("*").remove();
  d3.select("#legend").selectAll("*").remove();
  d3.select("#legend2").selectAll("*").remove();
    var g = d3.select("#legend")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var g2 = d3.select("#grid")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  open.then(function(data){
     //create PCA plot
    var xMin = d3.min(data, (function(d) { return +d.P1}))
    var xMax = d3.max(data, (function(d) { return +d.P1}))
    var yMin = d3.min(data, (function(d) { return +d.P2}))
    var yMax = d3.max(data, (function(d) { return +d.P2}))
    // var x = d3.scaleLinear().range([0,width]).domain(d3.extent(data, (function(d) { return +d.population})))
    // var y = d3.scaleLinear().range([height,0]).domain(d3.extent(data, (function(d) { return +d.educationExpenditures})))

    var x = d3.scaleLinear().range([0,width]).domain([xMin, xMax]).nice()
  
    var y = d3.scaleLinear().range([height,0]).domain([yMin, yMax]).nice()

    var xAxis = d3.axisBottom().scale(x)
    var yAxis = d3.axisLeft().scale(y)

    g2.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-size", "100px")
        .attr("text-anchor", "middle")
        .text("PC1");

    g2.append("g")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("PC2");
    
    g2.selectAll(".circle").data(data).enter()
     .append("circle")
      .attr("cx", function(d){return x(+d.P1)})
      .attr("cy", function(d){return y(+d.P2)})
      .attr("r", 5)
      .style("fill", function(d){return color(d.region)})




    
    // this is to create scree plot of our eigenvalues
    var yScale = d3.scaleLinear().range([height, 0]).domain([0, 5])
    var xScale = d3.scaleBand().range([0, width]).padding(0.1);

    xScale.domain(columns.map(function(d) {return d}))

    g.append("g") //Another group element to have our x-axis grouped under one group element
      .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
      .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
      //.selectAll("text")
      //.attr("transform", "translate(-20,10)rotate(-20)")
      .append("text")
          .attr("y", 50)
          .attr("x", 350)
          .attr("font-size", "24px")
          .attr("text-anchor", "end")
          .attr("stroke", "black")
          .attr("fill", "black")
          .text("PC numbers");

    g.append("g") //group y axis with it
        .call(d3.axisLeft(yScale)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30) // left or right, absolute coordinates
        .attr("x" , -200)
        .attr("text-anchor", "end")
        .attr("font-size", "24px")
        .attr("fill", "black")
        .attr("stroke", "black")
        .text("eigenvalue");

    g.selectAll(".bar") //create the bar
    .data(eigenvalueData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x" , function(d) { return xScale(d[0]);})
    .attr("y",  function(d) { return yScale(d[1]);})
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d[1])})
    .attr("fill-opacity", .5);

    g.append("path")
      .datum(eigenvalueData)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d[0]) +30 })
        .y(function(d) { return yScale(d[1]) })
        )

  // Add the line
    g.selectAll(".circle")
      .data(eigenvalueData)
      .enter()
      .append("circle")
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("cx", function(d) { return xScale(d[0]) +30 })
        .attr("cy", function(d) { return yScale(d[1]) })
        .attr("r", 5)
      var legends = d3.select("#legend2") //creating the legend at the HTML legend section 
        .append("svg")
        .attr("width", 150)
        .attr("height", 400)
        .selectAll(".legends")
        .data(regions);
    
      var legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i) {
          return "translate(0, " + (i+1)* 20 + ")"}) // creating the spaces between the each legends
                      
      legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d,i) { return color(d)}) //add rectangle of color

      legend.append("text").text(function(d, i) { return d}).attr("x", 20).attr("y", 20) //add the region next to the re

  })
}
