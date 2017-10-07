//draw bar
d3.select("body")   //select the <body> element (any css selector can be used)
  .append("svg")    // add at the end of the DOM a <svg> element
    .attr("width",100)  // set attributes of the <svg> element
    .attr("height",50)
  .append("rect")  //add inside the <svg> element a <rect> element
    .attr("width",100) // set attributes of the <rect> element
    .attr("height",50)
    .style("fill","lightblue");

// draw circle
d3.select("body")
  .append("svg")
    .attr("width",50)
    .attr("height",50)
  .append("circle")
    .attr("cx",25)
    .attr("cy",25)
    .attr("r",25)
    .style("fill","purple")

// draw text
d3.select("body")
.append("svg")
  .attr("width",50)
  .attr("height",50)
.append("text")
  .text("!!")
  .attr("x",25)
  .attr("y",25)
  .style("fill","purple")