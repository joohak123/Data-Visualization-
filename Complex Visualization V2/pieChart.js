var open = d3.csv("merged.csv"); //open the file and save it to a variable that way we can reuse it w/o opening

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
    return smallerData;
}

function myData(newData){
    let smallerData = [];
    let i = 0;
    let total = 0;
    let temp = [];

    d3.count(newData, (d,i) => smallerData[i] = d);
    console.log(smallerData);
    for(i = 0; i< smallerData.length; i++){ //remove key with undefined aka null data
        if(smallerData[i][0] == undefined){
            smallerData.splice(i);
        }
    }
    console.log(smallerData);
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
    //d3.select("svg").selectAll("*").remove(); //to remove the already existing graph
    let choice = document.getElementById("chart").value; //save the value of the drag down menu
    width = 700;
    height = 700;

    var svg = d3.select("body") // Almost same like Bar Chart
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    open.then(function(data){
        

        var newData; 
        var title;
        var smallerData;

        if(choice == "population"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.population), d => d.region); //creates an 2d array with 0 index being region, 1st index being population (sums up all the same region)
            title = "Total Population of the World";
            newData.sort(sortFunction);
            smallerData= this.change(newData);
        }

        else if (choice == "inflationRate"){
            //newData = d3.rollups(data, v=> d3.mean(v, d=> +d.inflationRate < 1000 && +d.inflationRate), d => d.region); //mean of the region : data field
            var testing = d3.group(data, function(d) {if (+d.inflationRate !== 0) {var rate = +d.inflationRate;
                return rate > 0 && rate < 1.5 ? "between 0% and 1.5%" : 
                ( rate >= 1 && rate < 3 ? "between 1.5% and 3%" : 
                ( rate >= 3 && rate < 4.5 ? "between 3% and 4.5%" : 
                (rate >= 4.5 && rate < 6 ? "between 4.5% and 6%" : 
                (rate < 0 ? "less than 0%" : "others"))));
            };});
            smallerData = this.myData(testing);
            title = "Inflation Rate Based On Categories per Countries";
        }

        else if (choice == "birthPer1000"){
            //newData = d3.rollups(data, v=> d3.mean(v, d=> +d.birthPer1000 != 0  && +d.birthPer1000), d => d.region);
            var testing = d3.group(data, function(d) {if (+d.birthPer1000 !== 0) {var rate = +d.birthPer1000;
                return rate > 0 && rate < 7 ? "between 0 and 7" : 
                ( rate >= 7 && rate < 14 ? "between 7 and 14" : 
                ( rate >= 14 && rate < 21 ? "between 14 and 21" : 
                (rate >= 21 && rate < 28  ? "between 21 and 28" : 
                (rate >= 28 && rate < 35? "between 28 and 35" : "others"))));
            };});
            smallerData = this.myData(testing);
            title = "Birth Per 1000 Based On Categories Per Countries";
        }

        else if (choice == "deathPer1000"){
            var testing = d3.group(data, function(d) {if (+d.deathPer1000 !== 0) {var rate = +d.deathPer1000;
                return rate > 0 && rate < 2.5 ? "between 0 and 2.5" : 
                ( rate >= 2.5 && rate < 5 ? "between 2.5 and 5" : 
                ( rate >= 5 && rate < 7.5 ? "between 5 and 7.5" : 
                (rate >= 7.5 && rate < 10  ? "between 7.5 and 10" : 
                (rate >= 10 && rate < 12.5? "between 10 and 12.5" : "others"))));
            };});
            smallerData = this.myData(testing);
            title = "Death Per 1000 Based On Categories Per Countries";
        }

        else if (choice == "GDPPerCapita"){
            var testing = d3.group(data, function(d) {if (+d.GDPPerCapita !== 0) {var rate = +d.GDPPerCapita;
                return rate > 0 && rate < 5000 ? "between 0 and $5000" : 
                ( rate >= 5000 && rate < 10000 ? "between $5000 and $10000" : 
                ( rate >= 10000 && rate < 15000 ? "between $10000 and $15000" : 
                (rate >= 15000 && rate < 20000  ? "between $15000 and $20000" : 
                (rate >= 20000 && rate < 25000? "between $20000 and $25000" : "others"))));
            };});

            smallerData = this.myData(testing);
            title = "GDP Per Capita On Categories Per Countries";
        }

        else if (choice == "GDPPurchasePower"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.GDPPurchasePower), d => d.region);
            title = "Total GDPPurchasePower of the Region";
            newData.sort(sortFunction);
            smallerData= this.change(newData);
        }

        else if (choice == "laborForce"){
            newData = d3.rollups(data, v=> d3.sum(v, d=> +d.laborForce), d => d.region);
            title = "Total Labor Force of the Region";
            newData.sort(sortFunction);
            smallerData= this.change(newData);
        }

        else if (choice == "GDPGrowthRate"){
            var testing = d3.group(data, function(d) {if (+d.GDPGrowthRate !== 0) {var rate = +d.GDPGrowthRate;
                return rate > 0 && rate < 1.5 ? "between 0% and 1.5%" : 
                ( rate >= 1 && rate < 3 ? "between 1.5% and 3%" : 
                ( rate >= 3 && rate < 4.5 ? "between 3% and 4.5%" : 
                (rate >= 4.5 && rate < 6 ? "between 4.5% and 6%" : 
                (rate < 0 ? "less than 0%" : "others"))));
            };});

            smallerData = this.myData(testing);
            title = "GDP Growth Rate On Categories Per Countries";
        }
       
        

        var color = d3.scaleOrdinal()
                    .domain(smallerData)
                    .range(d3.schemeSet2);

        var pieData = d3.pie().value(function(d) { return d[1]})(smallerData); //convert the data for pie
        
        //var pieData = d3.pie().value(function (d) { return d.number;})(newData);
       
        svg.append("text") //add a text for title
        .attr("transform", "translate(100,0)")
        .attr("x", 0) //larger the ## more to the right
        .attr("y", 30) // larget the ## more to the bottom
        .attr("font-size", "24px")
        .text(title);

        var segments = d3.arc().innerRadius(0) //helps to build arcs 
                        .outerRadius(200)
                        .padAngle(.05)
                        .padRadius(50)

        var sections = svg.append("g")
                        .attr("transform", "translate(250, 250)") //transform the data
                        .selectAll("path").data(pieData); //append path to the data 
        

        sections.enter().append("path") //append path 
            .attr("d", segments) // with the segments above
            .attr("fill", function(d) {  //fill the color w/ index of i of colors
                return color(d.data[1]);});

 
        var text = svg.select("g").selectAll("text") //create a text to fill in the numbers
                    .data(pieData);

        text.enter()
             .append("text")
             .attr("transform", function(d) { //this was onde to transform the number while rotating
                var midAngle = d.endAngle < Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ; //equation for the angle
                return "translate(" + segments.centroid(d) + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")"; }) //had to google to get the equation
             .attr("dy", ".35em") //move the text a bit down
             .attr('text-anchor','middle')
             .text(function(d) { return parseFloat((d.data[1]).toFixed(3)) + "%"});


        var regions = svg.append("g")
                        .attr("transform", "translate(450, 300)")
                        .selectAll(".regions") //this is done to avoid already existing g element
                        .data(pieData);


        var region = regions.enter()
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

}