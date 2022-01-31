var columns = ["population",  "GDPPurchasePower",  "reservesOfForeignCurrency", "electricityConsumption", "laborForce"]
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']

var correlations = [4.54 , 4.82, 4.49, 4.78, 4.70] 
var open = d3.csv("merged.csv")

function cross(a, b) {
    var c = [];
    n = a.length;
    m = b.length; 
    var i;
    var j;
    for (i = -1; ++i < n;) {
        for (j = -1; ++j < m;) {
            c.push({x: a[i], i: i, y: b[j], j: j});
        }
    }
    return c;
  }

var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions);
  
function create(){
    d3.select("#grid").selectAll("*").remove();
    d3.select("#legend").selectAll("*").remove();
    d3.select("#legend2").selectAll("*").remove();

    var size = 150;
    var padding = 1;
    
    var g = d3.select("#grid").append("svg")
                .attr("width", size * 5 + padding)
                .attr("height",size * 5 + padding)
                .append("g")
                .attr("transform", "translate(" + padding + "," + padding /2 + ")");
    
    open.then(function(data){
        var rangeByVariable = {};
        
            columns.forEach(function (column){
                rangeByVariable[column] = d3.extent(data, function(d) { if(d[column] != 0){
                    return +d[column];
                }
            })
        })
        console.log(rangeByVariable)
        var xScale = d3.scaleLog().range([padding / 2, size - padding / 2]) 
        var yScale = d3.scaleLog().range([size - padding / 2, padding /2]) //opposite range of xScale to make it look increasing 

        var yAxis = d3.axisRight().scale(yScale).ticks(5)
        var xAxis = d3.axisBottom().scale(xScale).ticks(5)

        yAxis.tickSize(5);
        xAxis.tickSize(5);
        
        g.selectAll(".x.axis").data(columns)
            .enter().append("g")
            .attr("class", "xAxis")
            .attr("transform", function(d, i) { //space out the tick marks for the graph x-axis
                return "translate(" + (5 - i - 1) * size + ",0)"
            })
            .each(function(d){ // add each domain of each rectangle with the extent we created an
                xScale.domain(rangeByVariable[d])
                d3.select(this).call(xAxis)
            }
            );
        
        g.selectAll(".y.axis").data(columns) ///space out the tick marks for the graph y-axis
            .enter()
            .append("g")
            .attr("class", "yAxis")
            .attr("transform", function(d, i) { 
                return "translate(0," + i * size + ")"
            })
            .each(function(d){
                yScale.domain(rangeByVariable[d])
                d3.select(this).call(yAxis);
            })
        var cell = g.selectAll(".cell") //create the cells
            .data(cross(columns, columns))
            .enter().append("g")
            .attr("class", "cell")
            .attr("transform", function(d) { 
                return "translate(" + (5 - d.i - 1) * size + "," + d.j * size + ")"; })
            .each(plot);

        cell.filter(function(d) { return d.i === d.j; }) //create text middle tile's variable names. 
                .append("text")
                .attr("x", padding)
                .attr("y", padding)
                .attr("dy", ".71em")
                .text(function(d, i) { return d.x + ":" + correlations[i]; });
        
        var legends = d3.select("#legend") //creating the legend at the HTML legend section 
                .append("svg")
                .attr("width", 150)
                .attr("height", 400)
                .selectAll(".legends")
                .data(regions);
            
        var legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i) {
            return "translate(0, " + (i+1)* 20 + ")"}) // creating the spaces between the each legends
                        
        legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d,i) { return color(d)}) //add rectangle of color

        legend.append("text").text(function(d, i) { return d}).attr("x", 20).attr("y", 20) //add the region next to the rectangle

    function plot(p) {
        var cell = d3.select(this);

        xScale.domain(rangeByVariable[p.x]); //set the domain of xScale with the values of x which is variable name
        yScale.domain(rangeByVariable[p.y]); //set the vomain of yScale with the values of y which is variable name

        cell.append("rect")
            .attr("class", "frame")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);
        
        cell.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", function(d) { 
                var minx = d3.min(data, function(d) {return +d[p.x]})
                var miny = d3.min(data, function(d) {return +d[p.y]})
                //var maxx = d3.max(data, function(d) {return +d[p.x]})
                //var maxy = d3.max(data, function(d) {return +d[p.y]})
                if(+d[p.y] > miny &&  +d[p.x] > minx ) {
                        return xScale(+d[p.x]); 
                }
            })
            .attr("cy", function(d) { 
                var minx = d3.min(data, function(d) {return +d[p.x]})
                var miny = d3.min(data, function(d) {return +d[p.y]})
                //var maxx = d3.max(data, function(d) {return +d[p.x]})
                //var maxy = d3.max(data, function(d) {return +d[p.y]})
                if(+d[p.y] > miny && +d[p.x] > minx) {
                    return yScale(+d[p.y]); 
                }
            })
            .attr("r", 2)
            .style("fill", function(d) { 
                return color(d.region); });

        }
    }
    );
}