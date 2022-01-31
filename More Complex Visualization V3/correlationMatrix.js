var open = d3.csv("correlation2.csv")

function create(){
    d3.select("#grid").selectAll("*").remove();
    d3.select("#legend").selectAll("*").remove();
    d3.select("#legend2").selectAll("*").remove();

    var top = 20;
    var bot = 200;
    var left = 200;
    var right = 20;
    var width = 800 - left - right;
    var height = 800 - top - bot;
    var columns = ["population", "birthPer1000", "deathPer1000", "GDPPerCapita", "GDPPurchasePower", "reservesOfForeignCurrency", "electricityConsumption", "laborForce"]
    var legendSize = 80;
    open.then(function(data){

        var g = d3.select("#grid").append("svg")
            .attr("width", width + left + right)
            .attr("height", height + top + bot)
            .append("g")
            .attr("transform", "translate(" + left +", " + top + ")");

        //making the data as 2D array instead of array of dictionaries. 
        arrData = [];

        for(var i = 0; i < 8 ;i ++){
            arrData[i] = [];
        }
        var grouping = d3.map(data, function (d, i){
            arrData[i][0] = +d.population
            arrData[i][1] = +d.birthPer1000
            arrData[i][2] = +d.deathPer1000
            arrData[i][3] = +d.GDPPerCapita
            arrData[i][4] = +d.GDPPurchasePower
            arrData[i][5] = +d.reservesOfForeignCurrency
            arrData[i][6] = +d.electricityConsumption
            arrData[i][7] = +d.laborForce

        })

        var maxValue = d3.max(arrData, function(c) { return d3.max(c, function(d) { return d }) }); //get the max
        var minValue = d3.min(arrData, function(c) { return d3.min(c, function(d) { return d }) }); //get the min

        var range = [minValue, maxValue];
        
        //Fixing the decimal points within the value
        for(var i = 0; i < 8 ;i ++){
            for(var j = 0; j < 8 ;j ++){
                if(arrData[i][j] == 1){
                    continue;
                }
                else{
                    var num = arrData[i][j];
                    arrData[i][j] = parseFloat(num).toFixed(4);
                }
            }
        }

        var padding = .05; // closer to 0 bigger the square

        
        var xScale = d3.scaleBand()  //scale the domain of x axis / width 
                    .domain(d3.range(8))
                    .range([0, width])
                    .paddingInner(padding);

        var yScale = d3.scaleBand() //scale the domain of y axis / height 
                    .domain(d3.range(8))
                    .range([0, height])
                    .paddingInner(padding);

        var color = d3.scaleLinear() // for color mapping 
                    .domain([minValue, 0 , maxValue])
                    .range(["blue", "white" , "red"])

        g.append("text") //add a text for title
            .attr("transform", "translate(100,0)")
            .attr("x", 0) //larger the ## more to the right
            .attr("y", -3.5) // larget the ## more to the bottom
            .attr("font-size", "20px")
            .text("8 by 8 correlation matrix");

        
        var row = g.selectAll(".row") //create the row with data and tranform the graph using yScale 
                .data(arrData)
                .enter().append("g")
                .attr("class", "row")
                .attr("transform", function(d, i) { return "translate(0," + yScale(i) + ")"; });

        var cell = row.selectAll(".cell") //create the cell with data and tranform the graph using yScale 
                .data(function(d) { return d; })
                .enter().append("g")
                .attr("class", "cell")
                .attr("transform", function(d, i) { return "translate(" + xScale(i) + ", 0)"; });

        cell.append("rect") //create the rectangle for the cell 
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("stroke-width", 0);

        cell.append("text") // adding the data inside of the cell
            .attr("dy", ".32em")
            .attr("x", xScale.bandwidth() / 2)
            .attr("y", yScale.bandwidth() / 2)
            .attr("text-anchor", "middle")
            .style("fill", function(d, i) { return d >= maxValue/2 ? 'white' : 'black';})
            .text(function(d, i) { return d; });

        row.selectAll(".cell") // color 
            .data(function(d, i) { //fill the numbers
                return arrData[i]; })
            .style("fill", function(d){ //fill the colors
                return color(d);
            })


        var labels = g.append('g')
            .attr('class', "labels");
 
        var xLabels = labels.selectAll(".x-label") //creating the x Label
            .data(columns)
            .enter().append("g")
            .attr("class", "x-label")
            .attr("transform", function(d, i) { return "translate(" + xScale(i) + "," + height + ")"; });

        xLabels.append("line") //little tick mark on the bottom
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .attr("x1", xScale.bandwidth() / 2)
            .attr("x2", xScale.bandwidth() / 2)
            .attr("y1", 0)
            .attr("y2", 5);

        xLabels.append("text") //append the labels at X axis 
            .attr("x", 0)
            .attr("y", yScale.bandwidth() / 2)
            .attr("dy", ".82em")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-60)")
            .text(function(d) { return d; });

        var yLabels = labels.selectAll(".y-label")  //creating the y Label
            .data(columns)
            .enter().append("g")
            .attr("class", "y-label")
            .attr("transform", function(d, i) { return "translate(" + 0 + "," + yScale(i) + ")"; });

        yLabels.append("line") //adding the little tick mark
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .attr("x1", 0)
            .attr("x2", -5)
            .attr("y1", yScale.bandwidth() / 2)
            .attr("y2", yScale.bandwidth() / 2);

        yLabels.append("text") //adding the labels 
            .attr("x", -8)
            .attr("y", yScale.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text(function(d, i) { return d; });

        //creating legend key start here
        var legends = d3.select("#legend") //creating the legend at the HTML legend section 
                .append("svg")
                .attr("width", legendSize)
                .attr("height", height + top + bot);

        var legend = legends
                .append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");
                
        //three colors for the legend
        legend.append("stop") 
                .attr("offset", "0")
                .attr("stop-color", "red")
                .attr("stop-opacity", 1);

         legend.append("stop")
            .attr("offset", "0.5")
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "1")
            .attr("stop-color", "blue")
            .attr("stop-opacity", 1);

        //making the rectangle for the bar
        legends.append("rect").attr("width", legendSize/2-10)
            .attr("height", height)
            .style("fill", "url(#gradient)") // making the gradient color, going from blue to red.
            .attr("transform", "translate(0," + top + ")"); 

        var y = d3.scaleLinear() //making the range for the legend 
                .range([height, 0])
                .domain([minValue, maxValue]);

        var yAxis = d3.axisLeft(y) //adding to the y axis 

        legends.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(41," + top + ")")
        .call(yAxis)

        
    }
    );
}