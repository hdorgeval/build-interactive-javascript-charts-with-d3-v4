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

// create a date parser
  const dateParser = d3.timeParse('%Y/%m/%d');
  const parsedData = data.map(d=> {
    return {
      ticker: d.ticker,
      values: d.values.map(
            v => {return { close: +v.close, date: dateParser(v.date)}; })
    }
  });
  console.log("parsed data:", parsedData);   

// create the Y axis
  // 1°) create a scale for the Y axis
  const yScale = d3.scaleLinear()
                 // setup the input values for the domain model
                 .domain([
                   d3.min(parsedData, d=> d3.min(d.values, v=> v.close)),
                   d3.max(parsedData, d=> d3.max(d.values, v=> v.close))
                 ])
                 // setup the output values that will map input values
                 .range([drawingArea.height,0])
                 // if you set the range to be [0, drawingArea.height], 
                 //   the yAXis will be oriented top to bottom
                 //.nice();
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
  const xScale = d3.scaleTime()
                   .domain([
                     d3.min(parsedData, d => d3.min(d.values, v => v.date)),
                     d3.max(parsedData, d => d3.max(d.values, v => v.date))
                   ])
                   .range([0,drawingArea.width])
                   //.nice();
  // 2°) create the axis generator
  const xAxisGenerator = d3.axisBottom(xScale)
                           .ticks(4)
                           //.ticks(d3.timeMonth.every(3))
                           .tickPadding(5)
  // 3°) insert the xAxis in the chart
  drawingChart.append("g")
                .attr("transform",`translate(0,${drawingArea.height})`)
                .call(xAxisGenerator)

// create an area generator
const areaGenerator = d3.area()
                        .x(d=> xScale(d.date))
                        .y0(yScale(yScale.domain()[0]))
                        .y1(d=> yScale(d.close))
                        .curve(d3.curveCatmullRom.alpha(0.5));

// draw each area
drawingChart.selectAll('.area')
            .data(parsedData)
            .enter()
            .append("path")
              .classed("area", true)
              .attr("d", d => areaGenerator(d.values))
              .style("stroke", (d,i) => ['#FF9900', '#3369E8'][i])
              .style("fill", (d,i) => ['#FF9900', '#3369E8'][i]);

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