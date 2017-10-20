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
          
  });