const chart = {
  width:200,
  height:300
}

const svgChart = d3.select(".chart")
                   .append("svg")
                     .attr("width",chart.width)
                     .attr("height",chart.height)

