var open = d3.csv("pcaData2.csv")
var regions = ['East Asia/Southeast Asia', 'Africa', 'South Asia', 'North America', 'South America', 'Middle East', 'Central Asia', 'Europe', 'Australia - Oceania', 'Central America']
var color = d3.scaleOrdinal(d3.schemeCategory10).domain(regions);

var margin = {top: 20, right: 20, bottom: 20, left: 20};
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var angle = Math.PI * 0;


var variable = []
var coeff = d3.csv("axisCorr.csv")
var xline = []
var yline = []
coeff.then(function(cff){
    d3.max(cff, function(d,i) {
        xline[i] = +d.x1
        yline[i] = +d.y1
    })
})

function create(){
    d3.select("#grid").selectAll("*").remove();
    d3.select("#legend").selectAll("*").remove();
    d3.select("#legend2").selectAll("*").remove();
    var g = d3.select("#grid")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    
    open.then(function(data){

        //Draw the graph + dots 
        var xMin = d3.min(data, (function(d) { return +d.P1}))
        var xMax = d3.max(data, (function(d) { return +d.P1}))
        var yMin = d3.min(data, (function(d) { return +d.P2}))
        var yMax = d3.max(data, (function(d) { return +d.P2}))

        var x = d3.scaleLinear().range([0,width]).domain([-5, xMax]).nice()
      
        var y = d3.scaleLinear().range([height,0]).domain([yMin, yMax]).nice()

        //var x = d3.scaleLinear().range([0,width]).domain([-3, 3]).nice()
      
        //var y = d3.scaleLinear().range([height,0]).domain([-3, 3]).nice()
    
        var xAxis = d3.axisBottom().scale(x)
        var yAxis = d3.axisLeft().scale(y)

        g.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("font-size", "100px")
        .attr("text-anchor", "middle")
        .text("PC1");

        g.append("g")
            .attr("transform", "translate(" + x(0) + ",0)")
            .call(yAxis)
          .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("PC2");
    
        g.selectAll(".circle").data(data).enter()
        .append("circle")
          .attr("cx", function(d){return x(+d.P1)})
          .attr("cy", function(d){return y(+d.P2)})
          .attr("r", 5)
          .style("fill", function(d){return color(d.region)})

        coeff.then(function(cff){
          g.selectAll(".line").data(cff).enter()
          .append("line")
            .attr("x1", x(0))
            .attr("y1", y(0))
            .attr("x2", function(d){ 
              if(d.variable == "inflationRate"){ //1
                return x(+d.x1 * 1000)
              }
              else if(d.variable == "educationExpenditures"){ // 2
                return x(+d.x1 *2000)
              }
              else if (d.variable == "population"){ // 3
                return x(+d.x1 * 1000) ; 
              }
              else if (d.variable == "electricityConsumption"){ //4
                return x(+d.x1 * 1000) ; 
              }
              else if (d.variable == "laborForce"){ // 5
                return x(+d.x1 * 1000) ; 
              }
              else if(d.variable == "GDPPerCapita"){//6
                return x(+d.x1 * 1000);
              }
              else if (d.variable == "deathPer1000"){//7
                return x(+d.x1 * 1000) ; 
              }
              else if (d.variable == "GDPPurchasePower"){//8
                return x(+d.x1 * 1000) ; 
              }
              else if (d.variable == "GDPGrowthRate"){//9
                return x(+d.x1 * 1000) ; 
              }
              else if(d.variable == "reservesOfForeignCurrency"){// 10
                return x(+d.x1 * 1000)
              }
              else{
                return x(0)
              }
            })
            .attr("y2", function(d){ 
              if(d.variable == "inflationRate"){ //1
                return y(+d.y1 * 1000)
              }
              else if(d.variable == "educationExpenditures"){//2
                return y(+d.y1 * 2000)
              }
              else if (d.variable == "population"){//3
                return y(+d.y1 * 1000) ; 
              }
              else if (d.variable == "electricityConsumption"){ //4
                return y(+d.y1 * 1000) ; 
              }
              else if (d.variable == "laborForce"){ // 5
                return y(+d.y1 * 1000) ; 
              }
              else if(d.variable == "GDPPerCapita"){ //6
                return y(+d.y1 * 1000)
              }
              else if (d.variable == "deathPer1000"){ // 7
                return y(+d.y1 * 1000 ) ; 
              }
              else if (d.variable == "GDPPurchasePower"){//8
                return y(+d.y1 * 1000 ) ; 
              }
              else if (d.variable == "GDPGrowthRate"){//9
                return y(+d.y1 * 1000) ; 
              }
              else if(d.variable == "reservesOfForeignCurrency"){//10
                return y(+d.y1 * 1000)
              }
              else{
                return y(0)
              }
  
            })
            .style("stroke", "blue")

          g.selectAll("text.line")
            .data(cff)
            .enter().append("text")
            .attr("class", "label-brand")
            .attr("x", function(d) {
              if(d.variable == "inflationRate"){ //1 check
                return x(+d.x1 * 320)
              }
              else if(d.variable == "educationExpenditures"){ // 2 check
                return x(+d.x1 * 2000)
              }
              else if (d.variable == "population"){ // 3 check
                return x(+d.x1 * 25) ; 
              }
              else if (d.variable == "electricityConsumption"){ //4 check
                return x(+d.x1 * 55) ; 
              }
              else if (d.variable == "laborForce"){ // 5 check
                return x(+d.x1 * 30) ; 
              }
              else if(d.variable == "GDPPerCapita"){//6 check 
                return x(+d.x1 * 6);
              }
              else if (d.variable == "deathPer1000"){//7 check
                return x(+d.x1 * 15) ; 
              }
              else if (d.variable == "GDPPurchasePower"){//8 check
                return x(+d.x1 * 45) ; 
              }
              else if (d.variable == "GDPGrowthRate"){//9 check
                return x(+d.x1 * 45) ; 
              }
              else if(d.variable == "reservesOfForeignCurrency"){// 10 check
                return x(+d.x1 * 55)
              }
       
            })
            .attr("y", function(d) { 
              if(d.variable == "inflationRate"){ //1
                return y(+d.y1 * 320)
              }
              else if(d.variable == "educationExpenditures"){//2
                return y(+d.y1 *  2000)
              }
              else if (d.variable == "population"){//3
                return y(+d.y1 *25) ; 
              }
              else if (d.variable == "electricityConsumption"){ 4
                return y(+d.y1 * 55) ; 
              }
              else if (d.variable == "laborForce"){ // 5
                return y(+d.y1 * 30) ; 
              }
              else if(d.variable == "GDPPerCapita"){ //6
                return y(+d.y1 * 6)
              }
              else if (d.variable == "deathPer1000"){ // 7
                return y(+d.y1 * 15) ; 
              }
              else if (d.variable == "GDPPurchasePower"){//8
                return y(+d.y1 * 45 ) ; 
              }
              else if (d.variable == "GDPGrowthRate"){//9
                return y(+d.y1 * 45) ; 
              }
              else if(d.variable == "reservesOfForeignCurrency"){//10
                return y(+d.y1 * 55)
              }
              
              else{
                return;
              }
            })
            .text(function(d) { 
              if(d.variable == "militaryExpenditures" || d.variable == "birthPer1000"){
                return
              } 
              else{
              return d.variable
              }
            })
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

          // g.selectAll("circle.line")
          //   .data(cff)
          //   .enter().append("circle")
          //   .attr("r", 7)
          //   .attr("cx", function(d) {
          //     if(d.variable == "inflationRate"){
          //       return x(+d.x1 * 20 * 80)
          //     }
          //     else if(d.variable == "educationExpenditures"){
          //       return x(+d.x1 * 20)
          //     }
          //     else if (d.variable == "population"){
          //       return x(+d.x1) ; 
          //     }
          //     else if (d.variable == "birthPer1000"){
          //       return x(+d.x1 ) ; 
          //     }
          //     else if (d.variable == "deathPer1000"){
          //       return x(+d.x1 ) ; 
          //     }
          //     else if(d.variable == "GDPPerCapita"){
          //       return x(+d.x1 * 20)
          //     }
          //     else if (d.variable == "militaryExpenditures"){
          //       return x(+d.x1) ; 
          //     }
          //     else if (d.variable == "GDPPurchasePower"){
          //       return x(+d.x1 * 68) ; 
          //     }
          //     else if (d.variable == "GDPGrowthRate"){
          //       return x(+d.x1 * 10) ; 
          //     }
          //     else if(d.variable == "reservesOfForeignCurrency"){
          //       return x(+d.x1 * 68)
          //     }
          //     else if (d.variable == "electricityConsumption"){
          //       return x(+d.x1 * 68) ; 
          //     }
          //     else if (d.variable == "laborForce"){
          //       return x(+d.x1 * 45) ; 
          //     }
    
          //     // else{
          //     // return x(+d.x1 * 20) ; 
          //     // }
          //   })
          //   .attr("cy", function(d) { 
          //     if(d.variable == "inflationRate"){
          //       return y(+d.y1 * 20 * 80)
          //     }
          //     else if(d.variable == "educationExpenditures"){
          //       return y(+d.y1 *  20 * 225)
          //     }
          //     else if (d.variable == "population"){
          //       return y(+d.y1) ; 
          //     }
          //     else if (d.variable == "birthPer1000"){
          //       return y(+d.y1 ) ; 
          //     }
          //     else if (d.variable == "deathPer1000"){
          //       return y(+d.y1 ) ; 
          //     }
          //     else if(d.variable == "GDPPerCapita"){
          //       return y(+d.y1 * 20)
          //     }
          //     else if (d.variable == "militaryExpenditures"){
          //       return y(+d.y1) ; 
          //     }
          //     else if (d.variable == "GDPPurchasePower"){
          //       return y(+d.y1 * 10 ) ; 
          //     }
          //     else if (d.variable == "GDPGrowthRate"){
          //       return y(+d.y1 * 45) ; 
          //     }
          //     else if(d.variable == "reservesOfForeignCurrency"){
          //       return y(+d.y1 * 68)
          //     }
          //     else if (d.variable == "electricityConsumption"){
          //       return y(+d.y1 * 68) ; 
          //     }
          //     else if (d.variable == "laborForce"){
          //       return y(+d.y1 * 45) ; 
          //     }
           // })
        })
    })
}