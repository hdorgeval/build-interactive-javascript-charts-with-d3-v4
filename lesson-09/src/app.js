const sparkline = {
    width:300,
    height:100,
    color: "#FF9900",
    label:{
        isVisible: true,
        yOffset: 12,
        color: "#666666",
        font:{
            family: "sans-serif",
            size: 12
        }
    }
}

d3.json("data/data.json",(data)=>{
    console.log("json data:", data);

    //compute a min value within data
    const min = d3.min(data,d => d);
    console.log(`min value in json data: ${min}` )

    //compute a max value within data
    const max = d3.max(data,d => d);
    console.log(`max value in json data: ${max}` )

    //create a scale from the input data domain
    const yLinearScale = d3.scaleLinear()
                    .domain([0,max])
                    .range([0,sparkline.height]);
    console.log(`domain value ${0} is converted into range value: ${yLinearScale(0)}`);
    console.log(`domain value ${max} is converted into range value: ${yLinearScale(max)}`);
    console.log(`range value ${50} is converted back into domain value: ${yLinearScale.invert(50)}`);

    const xLinearScale = d3.scaleLinear()
                    .domain([0,data.length])
                    .range([0,sparkline.width]);
    console.log(` X domain value ${1} is converted into range value: ${xLinearScale(1)}`);
    console.log(` X domain value ${data.length} is converted into range value: ${xLinearScale(data.length)}`);

    //transform input data into an array of points
    const intervalWidth = sparkline.width/data.length;
    const points = data.map((d,i)=> {
        return {
            x: xLinearScale(i) + intervalWidth/2,
            y: sparkline.height- yLinearScale(d)
        }});
    console.log("points:", points);

    //create the line generator. 
    // this line generator will receive the points array as input parameter
    const lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCatmullRom.alpha(0.5));

    //create the svg that will host the line
    const svg = d3.select("body")
            .append("svg")
                .attr("width",sparkline.width)
                .attr("height",sparkline.height);

    //insert the line inside the svg host
    svg.append("path") 
         .attr("class","line")
         .attr("d",lineGenerator(points))
         .style("fill","none")
         .style("stroke",sparkline.color)
         
    
    //materialize each point of the curve as a small circle
    svg.selectAll(".point")
       .data(points)
       .enter()
       .append("circle")
         .attr("class","point")
         .attr("cx",p => p.x)
         .attr("cy", p => p.y)
         .attr("r",3)
         .attr("fill", sparkline.color)
    
    //insert the value as label at each point of the line
    if (sparkline.label.isVisible){
        svg.selectAll("text")
             .data(data)
             .enter()
             .append("text")
               .text(d=>d)
               .attr("x",(d,i)=> xLinearScale(i)+intervalWidth/2)
               .attr("y",d=> sparkline.height- yLinearScale(d) + sparkline.label.yOffset)
               .attr("text-anchor","middle")
               .attr("fill",sparkline.label.color)
               .attr("font-family", sparkline.label.font.family)
               .attr("font-size",sparkline.label.font.size)
    }
    
        
});
