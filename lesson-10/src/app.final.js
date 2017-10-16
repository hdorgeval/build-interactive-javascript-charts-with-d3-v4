// find the first 'div' DOM element in the page DOM
const divSelection = d3.select('div');
console.log("div DOM element found: ", divSelection.nodes());

// find the first 'a' DOM element in the page DOM
const linkSelection = d3.select('a');
console.log("<a> DOM element found: ", linkSelection.nodes());

// find all 'a' DOM elements in the page DOM
const allLinksSelection = d3.selectAll('a');
console.log("<a> DOM elements found: ", allLinksSelection.nodes());

// find all 'a' DOM elements inside the first div
const div = d3.select('div.title')
const allLinksSelectionInDiv = div.selectAll('a');
console.log("<a> DOM elements found inside the div: ", allLinksSelectionInDiv.nodes());

// find all 'a' DOM elements inside the first div
// by chaining methods
const links = d3.select('div.title')
                  .selectAll('a')
                  .nodes();
console.log("<a> DOM elements found inside the div (method chaining): ", links);
                    
// find all links that have the class named 'action'
const actionLinks = d3.selectAll('a.action')
                      .node();
console.log("<a class='action'> DOM elements found inside the DOM: ", actionLinks);
                      
// select the second 'a' DOM elements inside the first div
// by chaining methods
const secondLink = d3.select('div.title')
                       .select('a:nth-child(2)')
                       .nodes();
console.log(" second <a> DOM elements found inside the div (method chaining): ", secondLink);
