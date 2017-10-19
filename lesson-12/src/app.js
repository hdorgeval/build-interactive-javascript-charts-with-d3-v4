// append a DOM element inside another DOM element
// in this example I append a button inside a div
d3.select("div.title")
  .append("button")
    .html("Buy Now <b>Special Offer</b>");  
    
// insert a DOM element before another one
d3.select("div.title")
  .insert("button","a:first-child")
    .html("inserted before the first link");  

// insert a DOM element before the second link
d3.select("div.title")
  .insert("button","a:nth-child(3)")
    .html("inserted before the second link"); 

//remove the link with class action
d3.select("a.action")
  .remove();


//insert a complete hierarchy of DOM elements
d3.select("body")
  .append("div")
    .classed("chart",true)
  .append("button")
    .style("color","red")
    .text("submit")
