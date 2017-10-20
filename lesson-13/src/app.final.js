//load json data
d3.json("data/data.json",(data)=>{
  console.log("json data:", data);

  const scores = data;

  //compute a min value within data
  const min = d3.min(data,d => d.score);
  console.log(`min score in json data: ${min}` )

  //compute a max value within data
  const max = d3.max(data,d => d.score);
  console.log(`max score in json data: ${max}` )

  d3.select(".chart")
    .append("svg")
      .attr("width",200)
      .attr("height",300)
    .selectAll("rect")
    .data(scores)
    .enter()
      .append("rect")
        .attr("class","bar")
        .attr("y", (d,i) => i*33)
        .style("width",d=> d.score)
        .text(d=> d.name) 
        //setting text content inside the <rect> does nothing
        //text can only be visualized by adding a <text> element inside the <svg> container
  
  // instead of directly creating <rect> elements directly 
  // wrap each <rect> inside a <g> element
  // the <g> container does not have x and y attributes
  // the positionning of the <g> element is only done through a transform

  const gContainers = d3.select("div.chart2")
    .append("svg")
    .attr("width",200)
    .attr("height",300)
    .selectAll("g")
    .data(scores)
    .enter()
      .append("g")
      .attr("class","bar")
      //.attr("y", (d,i) => i*33);
      .attr("transform",(d,i)=> `translate(0,${i*33})`);

  // now we can inject the <rect> element in each <g> container
  gContainers
    .append("rect")
      .attr("class","bar")
      //.attr("y", (d,i) => i*33)
      // the <rect> position is relative to the <g> container (by default 0,0)
      .style("width",d=> d.score)
  
  // inject the <text> element after the <rect> in each <g>
  gContainers
    .append("text")
      .attr("y", 20) // offset the text so that it is centered in the bar
      .text(d=> d.name)

});