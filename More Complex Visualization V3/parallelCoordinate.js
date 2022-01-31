var columns = ["population", "laborForce", "GDPPurchasePower",  "electricityConsumption" ,"reservesOfForeignCurrency" , "birthPer1000" , "militaryExpenditures", "educationExpenditures"]
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']

var open = d3.csv("merged.csv")

var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions); //colors w/ the domain region

var margin = {top: 30, right: 10, bottom: 10, left: 50},
  width = 1000 - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page


function create(){
    d3.select("#grid").selectAll("*").remove();
    d3.select("#legend").selectAll("*").remove();
    d3.select("#legend2").selectAll("*").remove();

    var g = d3.select("#grid")
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")

    open.then(function(data){
        var yScale = {};
        // var g = d3.select("#grid").append("svg")
        //         .attr("width", width + left + right)
        //         .attr("height", height + top + bot)
        //         .append("g")
        //         .attr("transform", "translate(" + left +", " + top + ")");

        // columns.forEach(function (column){
        //     yScale[column] = d3.scaleLog().domain(
        //                         d3.extent(data, function(d) {
        //                             return +d[column];
        //                         })
        //                         ).range([height,0]) 
        // })

        //creating the yScale range + domain via tha order of correlation strength 
        yScale["population"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["population"] != 0) {return +d["population"];}})).range([height,0]).nice() //scaleLog for high numbers
        yScale["laborForce"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["laborForce"] != 0) {return +d["laborForce"];}})).range([height,0]).nice() 
        yScale["GDPPurchasePower"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["GDPPurchasePower"] != 0) {return +d["GDPPurchasePower"];}})).range([height,0]).nice() 
        yScale["electricityConsumption"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["electricityConsumption"] != 0) {return +d["electricityConsumption"];}})).range([height,0]).nice() 
        yScale["reservesOfForeignCurrency"] = d3.scaleLog().domain(d3.extent(data, function(d) {if( +d["reservesOfForeignCurrency"] != 0) {return +d["reservesOfForeignCurrency"];}})).range([height,0]).nice() 
        yScale["birthPer1000"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["birthPer1000"];})).range([height,0]) //scaleLinear for smaller numbers
        yScale["militaryExpenditures"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["militaryExpenditures"];})).range([height,0]) 
        yScale["educationExpenditures"] = d3.scaleLinear().domain(d3.extent(data, function(d) {return +d["educationExpenditures"];})).range([height,0]) 

        xScale = d3.scalePoint().range([0, width]).domain(columns) //creating the xScale using range + doamin
        
        
 
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
        
        g.selectAll(".path") //drawing the path 
            .data(data)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", function(d){ return color(d.region)}) //stroke based on color mapped with region + object's region
            .style("opacity" , 0.5)

        g.selectAll(".axis").data(columns).enter().append("g") //draw the x-Axis 
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

            var legends = d3.select("#legend") //creating the legend at the HTML legend section 
                .append("svg")
                .attr("width", 150)
                .attr("height", 400)
                .selectAll(".legends")
                .data(regions);
            
        var legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i) {
            return "translate(0, " + (i+1)* 20 + ")"})
                        
        legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d,i) { return color(d)})

        legend.append("text").text(function(d, i) { return d}).attr("x", 20).attr("y", 20)

   
    })
    
}