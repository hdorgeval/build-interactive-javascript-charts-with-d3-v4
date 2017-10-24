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

  const gContainers = d3.select("div.chart")
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
      // add a click handler to the <rect> element
      .on("click",()=> console.log("bar click"))
      // add a mouseover handler
      .on("mouseover", function(d,i,elements){
        // 'this' represents the DOM element
        console.log(this);
        
        // elements reprsents all elements in the current selection
        // elements = all <rect> DOM elements
        console.log(elements);
        
        // wrap the DOM element in D3 in order to change it
        d3.select(this)
            .classed("barOn",true)
            .style("transform","scaleX(2)");

        //wrap all rects in d3 in order to modify other rects
        d3.selectAll(elements)
          .filter(":not(:hover)")
          .style("fill-opacity",0.3)
      })
      // add a mouseout handler
      .on("mouseout", function(d,i,elements){
        d3.select(this)
            .classed("barOn",false)
            .style("transform","scaleX(1)");

        // revert the opacity on all elements
        d3.selectAll(elements)
          .style("fill-opacity",1);

      })
  
  // inject the <text> element after the <rect> in each <g>
  gContainers
    .append("text")
      .attr("y", 20) // offset the text so that it is centered in the bar
      .text(d=> d.name)
      .style("pointer-events","none")

});