//wrapping function - dsd
//function runViz() {
//window.onload=function(){
$(document).ready(function(){ //jquery ~equivalent for window.onload

var width = 350;
var height = 350;
var radius = Math.min(width, height) / 3.3;
var outerradius = Math.min(width, height) / 2;
var minimumradiusadjustment = 50;
var innerradius = 25;
var numTicks = 5;
var sdat = new Array();
var main = d3.select("#maincontainer");
var countryselection = ["CHN","IND","USA"] ; 
var url = "";
var apiServer = "http://192.241.242.155/";


// JSON for select Boxes
d3.json(apiServer+"country_list.json", function(error, json) {  
    var selecthtml = "";
    $.each(json, function(name, iso) {
        selecthtml +="<option value=\""+iso+"\">"+name+"</option>";
    }); 
    $.each(countryselection, function(i, d) {  
        $("#clist").append("<select class='clist' id='c"+i+"'>"+selecthtml+"</select>");
        $("#c"+i+" option[value='" + d + "']").prop('selected', true);
    });
    // Events for checkbox change
    $( "select" )
    .change(function () {
        countryselection = [];
        $( "select option:selected" ).each(function() {
            
            countryselection.push($( this ).attr( 'value' ));
        });
        console.log(countryselection);
        drawgraphs(countryselection);
    })
    .change();
}); 



// Indicator list setup
$.each(issueColors, function(key, d) {
    d3.select("#leg")
    .append("div").attr("id", key).attr("class", "leg").style("background", issueColors[key])
    .append("div").attr("class", "list").html(cat[key].title);    
});

// General arcs and setup
arc = d3.svg.arc()
    .outerRadius(function (d) {
        if(d.data.value*1<0) d.data.value = 0;
        return radius * (+d.data.value/100) + minimumradiusadjustment;
    })
    .innerRadius(innerradius);

pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
    return 1;
});

drawgraphs(countryselection);

function drawgraphs(cs) {
    
    url = "";
    $.each(cs, function(i, d) {  
        //url += "iso_codes[]="+d+"&";
        url += "iso_codes[]="+d+"&";
    });
    
    // JSON for radars and indicator list
    d3.json(apiServer+"radar_chart.json?years[]=2012&"+url, function(error, json) {
    //d3.json("http://107.170.152.222/radar_chart.json?years[]=2012&iso_codes[]=CHN&iso_codes[]=IND&iso_codes[]=USA&"+url, function(error, json) { //dsd test
        $("#maincontainer").empty(); //dsd THIS seems to be related to the radar graph disappearing issue
        $.each(json[0], function(key, country2) {
            country = country2.data;
            
            var div = main.append("div").attr("class", "country").html("<h1>"+country.name+"</h1>");
            circle = div.append("div").attr("class", "circle");
            
            svg = circle.append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "relative")
            .style("left", "0")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            
            g = svg.selectAll(".arc")
            .data(pie(country.indicators))
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
            
            // titles for each arc
            g.append("title").text(function (d) {
                title = cat[d.data.name].title;
                return title;
                
            });
            
            // pie chart stuff
            g.append("path")
            .attr("d", arc)
            .attr("class", "piearc")
            .style("fill", function (d, i) {
                return issueColors[d.data.name];
            });
            
            
            g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return "";
            });
            
            // Label arcs
            var arct = d3.svg.arc()
            .outerRadius(outerradius)
            .innerRadius(outerradius - 20);
            
            g.append("path").attr("d", arct)
            .attr("id", function (d) {
                return "path" + d.data.name;
            })
            .attr("class", "label")
            .style("fill", function (d) {
                return issueColors[d.data.name];
            });
            
            
            g.append("text")
            .attr("dy", 15)
            .append("textPath")
            .attr("xlink:href", function (d) {
                return "#path" + d.data.name
            })
            .attr("startOffset", 10)
            .text(function (d) {
                return d.data.value; // cat[d.data.name].title;
            }).attr("class", "labeltext"); 
            
            // Write raw data in list
            $.each(country.indicators, function(key, indicator) {
                d3.select("#"+indicator.name).append("div")
                .attr("class", "list").html(indicator.value);    
            }); 
        });
    });
    
    
    // JSON for line graph
    d3.json(apiServer+"line_graph.json?indicator=EH_HealthImpacts&iso_codes[]=CHN&iso_codes[]=IND&iso_codes[]=DEU", function(error, json) { 
        console.log(json.data);
        //console.log(sinAndCos());
        nv.addGraph(function() {
            var chart = nv.models.lineChart()
            .margin({left: 100})  
            .x(function(d) { return 1*d["year"] })
            .y(function(d) { return 1*d["value"] })
            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
            .transitionDuration(350)  //how fast do you want the lines to transition?
            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
            .showYAxis(true)        //Show the y-axis
            .showXAxis(true)        //Show the x-axis
            ;
            
            chart.xAxis.axisLabel('Year').tickFormat(d3.format("d"));
            
            //chart.yAxis.tickFormat(d3.format('.2f'));
            
            d3.select('#linechart')
            .append("svg")  //Select the <svg> element you want to render the chart in.   
            .datum(json.data)         //Populate the <svg> element with chart data...
            .call(chart);          //Finally, render the chart!
            
            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            return chart;
        });
    });
}



function mouseover() {
    //console.log(d3.select(this).select("path"));
    //d3.select(this).select(".piearc").attr("transform", "scale(0.5)")
    
    d3.select(this).select(".piearc").transition()
        .duration(100)
        .attr("transform", "scale(1.1)");
        //.style("fill", function (d) {
        //return colordark(d.data.values[1].values[0].value);
    //});
    d3.select(this).select(".label").transition()
        .duration(200)
        .style("opacity", 0);
}

function mouseout() {
    d3.select(this).select(".piearc").transition()
        .duration(300)
        .attr("transform", "scale(1)");
    //    .style("fill", function (d) {
    //    return color(d.data.values[1].values[0].value);
    //});
    d3.select(this).select(".label").transition()
        .duration(300)
        .style("opacity", 1);
}

})(); //ends mega meta wrapper function
