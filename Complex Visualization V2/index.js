function button(){
    let text = document.getElementById("chart").value;
    if(text == "bar"){
        window.location.replace("barChart.html");
    }
    else if(text == "pie"){
        window.location.replace("pieChart.html");
    }
    else if(text == "scatterplot"){
        window.location.replace("scatterplot.html");
    }
}
