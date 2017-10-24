const chart = {
  width:200,
  height:300,
  //define the outer margin of the graphic that will be inserted in the chart
  margin:{
    top:10,
    bottom:10,
    left:10,
    right:10
  }
  
}

const drawingArea = {
  // compute the inner width
  width: chart.width - chart.margin.left - chart.margin.right,
  // compute inner height
  height: chart.height - chart.margin.top - chart.margin.bottom
}

const drawingChart = d3.select(".chart")
                   .append("svg")
                     .attr("width",chart.width)
                     .attr("height",chart.height)
                   // define the drawing area
                   .append("g")
                     .attr("transform",`translate(${chart.margin.left},${chart.margin.top})`);


drawingChart.append("rect")
          .attr("width", drawingArea.width)
          .attr("height",drawingArea.height)
          .style("fill","lightblue")
          .style("stroke","green");
