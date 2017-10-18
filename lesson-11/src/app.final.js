// select 2nd link in the div
const secondLink = d3.select('div>a:nth-child(2)');
console.log("second link in div: ", secondLink.nodes());

// modify the href attribute of this link
console.log(`initial href value: ${secondLink.attr("href")}`);
secondLink.attr("href","http://google.com");
console.log(`final href value: ${secondLink.attr("href")}`);

// use chaining methods to change attributes and styles
d3.select('div>a:nth-child(2)')
    .attr("href","http://google.com")
    .style("color","red");


// use CSS class to change styles instead of the d3 style method
d3.select('div>a:nth-child(3)')
    .attr("href","http://google.com")
    .classed("red",true);

// change the text content of the selected element
d3.select('div>a:nth-child(3)')
    .attr("href","http://google.com")
    .classed("red",true)
    .text("Inventory");


// change the html content of the selected element
d3.select('a.action')
    .attr("href","http://google.com")
    .classed("blue",true)
    .html("Buy Now <b>Special Offer</b>");

