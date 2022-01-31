var open = d3.csv("mdsData.csv")
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']
var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions);


//var PC1 = "population"
//var PC2 = "educationExpenditures"

var margin = {top: 30, right: 30, bottom: 100, left: 60},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



function create(){
  d3.select("#grid").selectAll("*").remove();
  d3.select("#legend").selectAll("*").remove();
  d3.select("#legend2").selectAll("*").remove();
    var g2 = d3.select("#grid")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
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

    g2.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle")
        .text("");

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
      .attr("r", 4)
      .style("fill", function(d){return color(d.region)})

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
