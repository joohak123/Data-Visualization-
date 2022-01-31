
var open = d3.csv("merged.csv"); //open the file and save it to a variable that way we can reuse it w/o opening

function sortFunction(a, b) { //sorting function for my data arr ay
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1; // > will return highest to lowest , < will return 
    }
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
            console.log(smallerData[i][1])
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

function create(){
    d3.select("svg").selectAll("*").remove(); //to remove the already existing graph
    let choice = document.getElementById("chart").value; //save the value of the drag down menu
    var svg = d3.select("svg"), margin = 180
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
    open.then(function(data){

        var newData; 
        var leftLabel;
        var title;
        var bottomLabel;
        if(choice == "population"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.population), d => d.region); //creates an 2d array with 0 index being region, 1st index being population (sums up all the same region)
            title = "Total Population of the Region";
            leftLabel = "Population";
            bottomLabel = "Region";
        }
        else if (choice == "inflationRate"){
            var testing = d3.group(data, function(d) {if (+d.inflationRate !== 0) {var rate = +d.inflationRate;
                return rate > 0 && rate < 1 ? "between 0% and 1%" : 
                ( rate >= 1 && rate < 2 ? "between 1% and 2%" : 
                ( rate >= 2 && rate < 3 ? "between 2% and 3%" : 
                (rate >=  3 && rate < 4 ? "between 3% and 4%" : 
                (rate >= 4 && rate < 5 ? "between 4% and 5%" : 
                (rate >= 5 && rate < 6 ? "between 5% and 6%" : 
                (rate >= 6 && rate < 7 ? "between 6% and 7%" : 
                (rate >= 7 && rate < 8 ? "between 7% and 8%" : 
                (rate < 0? "less than 0%" : "more than 8%"))))))));
            };});
            
            newData = this.myData(testing);
            title = "Inflation Rate of the Countries in cateogry";
            leftLabel = "Number of Countries";
            bottomLabel = "Inflation Rate (%) in Category";
        }
        else if (choice == "birthPer1000"){
            //newData = d3.rollups(data, v=> d3.mean(v, d=> +d.birthPer1000 != 0  && +d.birthPer1000), d => d.region);

            var testing = d3.group(data, function(d) {if (+d.birthPer1000 !== 0) {var rate = +d.birthPer1000;
                return rate > 0 && rate < 5 ? "between 0 and 5" : 
                ( rate >= 5 && rate < 10 ? "between 5 and 10" : 
                ( rate >= 10 && rate < 15 ? "between 10 and 15" : 
                (rate >=  15 && rate < 20 ? "between 15 and 20" : 
                (rate >= 20 && rate < 25 ? "between 20 and 25" : 
                (rate >= 25 && rate < 30 ? "between 25 and 30" : 
                (rate >= 30 && rate < 35 ? "between 30 and 35" : 
                (rate >= 35 && rate < 40 ? "between 35 and 40" : 
                (rate >= 40 && rate < 45? "between 40 and 45" : "more than 45"))))))));
            };});
            
            newData = this.myData(testing);
            title = "Birth Per 1000 people of the Countries in cateogry";
            leftLabel = "Number of Countries";
            bottomLabel = "Birth per 1000 people in Category";
        }
        else if (choice == "deathPer1000"){
            var testing = d3.group(data, function(d) {if (+d.deathPer1000 !== 0) {var rate = +d.deathPer1000;
                return rate > 0 && rate < 1 ? "between 0 and 1" : 
                ( rate >= 1 && rate < 2 ? "between 1 and 2" : 
                ( rate >= 2 && rate < 3 ? "between 2 and 3" : 
                (rate >=  3 && rate < 4 ? "between 3 and 4" : 
                (rate >= 4 && rate < 5 ? "between 4 and 5" : 
                (rate >= 5 && rate < 6 ? "between 5 and 6" : 
                (rate >= 6 && rate < 7 ? "between 6 and 7" : 
                (rate >= 7 && rate < 8 ? "between 7 and 8" : 
                (rate >= 8 && rate < 9 ? "between 8 and 9" : "more than 9%"))))))));
            };});
            newData = this.myData(testing);
            title = "Death Per 1000 people of the Countries in cateogry";
            leftLabel = "Number of Countries";
            bottomLabel = "Death per 1000 people in Category";
        }
        else if (choice == "GDPPerCapita"){
            var testing = d3.group(data, function(d) {if (+d.GDPPerCapita !== 0) {var rate = +d.GDPPerCapita;
                return rate > 0 && rate < 5000 ? "$0~$5000" : 
                ( rate >= 5000 && rate < 10000 ? "$5000~$10000" : 
                ( rate >= 10000 && rate < 15000 ? "$10000~$15000" : 
                (rate >=  15000 && rate < 20000 ? "$15000~$20000" : 
                (rate >= 20000 && rate < 25000 ? "$20000~$25000" : 
                (rate >= 25000 && rate < 30000 ? "$25000~$30000" : 
                (rate >= 30000 && rate < 35000 ? "$30000~$35000" : 
                (rate >= 35000 && rate < 40000 ? "$35000~$40000" : 
                (rate >= 40000 && rate < 45000 ? "$40000~$45000" : "more than $45000"))))))));
            };});
            
            newData = this.myData(testing);
            title = "GDP per Capita of the Countries in cateogry";
            leftLabel = "Number of Countries";
            bottomLabel = "GDP per Capita ($) in category";
        }
        else if (choice == "GDPPurchasePower"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.GDPPurchasePower != 0  && +d.GDPPurchasePower/1000000), d => d.region);
            title = "GDP purchase power of the Countries per Region";
            leftLabel = "GDP purchase power (per million $)";
            bottomLabel = "Region";
        }
        else if (choice == "laborForce"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.laborForce), d => d.region);
            title = "Total Labor Force of the Region";
            leftLabel = "Labor Force";
            bottomLabel = "Region";
        }
        else if (choice == "GDPGrowthRate"){
            var testing = d3.group(data, function(d) {if (+d.GDPGrowthRate !== 0) {var rate = +d.GDPGrowthRate;
                return rate > 0 && rate < 1 ? "between 0% and 1%" : 
                ( rate >= 1 && rate < 2 ? "between 1% and 2%" : 
                ( rate >= 2 && rate < 3 ? "between 2% and 3%" : 
                (rate >= 4 && rate < 4 ? "between 4% and 5%" : 
                (rate >= 5 && rate < 6 ? "between 5% and 6%" : 
                (rate >= 6 && rate < 7 ? "between 6% and 7%" : 
                (rate >= 7 && rate < 8 ? "between 7% and 8%" : 
                (rate >= 8 && rate < 9 ? "between 8% and 9%" : 
                (rate < 0 ? "less than 0%" : "more than 9%"))))))));
            };});
            
            newData = this.myData(testing);
            title = "GDP Growth Rate of the Countries in category";
            leftLabel = "Number of Countries";
            bottomLabel = "GDP Growth Rate (%) in Category";
        }
       
        svg.append("text") //add a text for title
        .attr("transform", "translate(100,0)")
        .attr("x", 200) //larger the ## more to the right
        .attr("y", 50) // larget the ## more to the bottom
        .attr("font-size", "24px")
        .text(title);
        
        newData.sort(sortFunction);
        var color = d3.scaleOrdinal()
                    .domain(newData)
                    .range(d3.schemeSet2);
        var xScale = d3.scaleBand().range([0, width]).padding(0.4);
            yScale = d3.scaleLinear().range([height,0]);

        xScale.domain(newData.map(function(d) {return d[0]})); //determine x axis domain w/ region 
        //yScale.domain([0, d3.max(cats, function(d) { return d[1]; })]); they both work 
        let min = 0;
        
        if( d3.min(newData, d => d[1]) < min){ //to determine the base value for the y axis
            min = d3.min(newData, d => d[1]);
        }
        yScale.domain([min*2, d3.max(newData, d => d[1])]); // determine y axis domain w/ the given input

        g.append("g") //Another group element to have our x-axis grouped under one group element
        .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
        .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 400)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(bottomLabel);
        
        g.append("g") //group y axis with it
        .call(d3.axisLeft(yScale)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5) // left or right, absolute coordinates
        .attr("dy", "-8.1em") //relatives to the "x / "y" moves it left or right
        .attr("dx", "-10em") // relatives to the "x / y" moves it up or down
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(leftLabel);
     
        g.selectAll(".bar") //create the bar
         .data(newData)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x" , function(d) { return xScale(d[0]);})
         .attr("y",  function(d) { return yScale(d[1]);})
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d[1])})
         .attr("fill", function(d) { return color(d[1])});
    })

}