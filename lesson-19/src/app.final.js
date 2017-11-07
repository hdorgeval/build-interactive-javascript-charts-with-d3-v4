const chart = {
  width:400,
  height:600,
  //define the outer margin of the graphic that will be inserted in the chart
  margin:{
    top:10,
    bottom:30,
    left:30,
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
                     .attr("width",chart.width) // set the viewport width
                     .attr("height",chart.height) // set the viewport height
                     // make the chart responsive
                     .call(responsivefy)
                     // define the drawing area
                   .append("g")
                     .attr("transform",`translate(${chart.margin.left},${chart.margin.top})`);
//load json data
d3.json("data/data.json",(data)=>{
  console.log("json data:", data);

// create the Y axis
  // 1°) create a scale for the Y axis
  const yScale = d3.scaleLinear()
                 // setup the input values for the domain model
                 .domain(d3.extent(data, d=> d.expectancy))
                 // setup the output values that will map input values
                 .range([drawingArea.height,0])
                 // if you set the range to be [0, drawingArea.height], 
                 //   the yAXis will be oriented top to bottom
                 .nice();
  // 2°) create the axis generator
  const yAxisGenerator = d3.axisLeft(yScale)
                           .ticks(5) // set the number of ticks that should be rendered when drawing the y Axis
                           //.ticks(5,'s') // set the tick formatting
                           //.tickValues([17,57,63]) // only show a specific domain values on the y Axis
  // 3°) insert the yAxis in the chart
  drawingChart.append("g")
              .call(yAxisGenerator);


// create the X axis
  // 1°) create a scale for the x Axis
  const xScale = d3.scaleLinear()
                   .domain(d3.extent(data, d=> d.cost))
                   .range([0,drawingArea.width])
                   .nice();
  // 2°) create the axis generator
  const xAxisGenerator = d3.axisBottom(xScale)
                           .ticks(4)
                           //.ticks(d3.timeMonth.every(3))
                           .tickPadding(5)
  // 3°) insert the xAxis in the chart
  drawingChart.append("g")
                .attr("transform",`translate(0,${drawingArea.height})`)
                .call(xAxisGenerator)

// create a d3 scale to handle the radius of circles
const rScale = d3.scaleSqrt()
                 .domain([0, d3.max(data,d=> d.population)])
                 .range([0,40]);

// create the circles containers
const circleContainers = drawingChart.selectAll(".point")
            .data(data)
            .enter()
            .append("g")
              .attr("class", "point")
              .attr("transform", d => `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`);

// create a circle in each container
circleContainers.append("circle")
              .attr("class","point")
              .attr("r", d => rScale(d.population))

// create a text label in each container
circleContainers.append("text")
              .classed("label",true)
              .attr("y",4)
              .text(d=> d.code)

});

function responsivefy(svg){
  const container = d3.select(svg.node().parentNode);
  const svgWidth = parseInt(svg.style("width"));
  const svgHeight = parseInt(svg.style("height"));
  const aspectRatio = svgWidth / svgHeight;
  // add viewport
  svg.attr("viewBox",`0 0 ${svgWidth} ${svgHeight}`)
     .attr("preserveAspectRatio", "xMinYMid")
     .call(resize);
  
  d3.select(window).on(`resize.${container.attr("id")}`,resize)

  function resize(){
    const targetWidth = parseInt(container.style("width"));
    svg.attr("width",targetWidth)
       .attr("height",Math.round(targetWidth /aspectRatio));
  }

}