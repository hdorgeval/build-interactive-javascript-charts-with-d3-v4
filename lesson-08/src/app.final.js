const sparkline = {
    width:300,
    height:100,
    padding:2,
    label:{
        yOffset: 14,
        color: "#eeeeee",
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
    
    //create a color scale
    const colorRange = [];
    for (var i = 0; i <= 256; i++) {
        colorRange.push(i);
    }
    const colorScale = d3.scaleQuantize()
                    .domain([0,max])
                    .range(colorRange);

    //create a color transform                
    colorPicker = (d)=>{
        if (d< 20){
            return `rgb(${colorScale(d)},0,0)`
        }
        return `rgb(0,${colorScale(d)},0)` 
    }

    //create the svg that will host the bar chart
    const svg = d3.select("body")
            .append("svg")
                .attr("width",sparkline.width)
                .attr("height",sparkline.height);

    //insert bars inside the svg host
    const barWidth = sparkline.width/data.length;
    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect") 
         .attr("x",(d,i)=> xLinearScale(i))
         .attr("y",d=> sparkline.height- yLinearScale(d))
         .attr("height",d=> yLinearScale(d))
         .attr("width",barWidth - sparkline.padding)
         .attr("fill", (d)=> colorPicker(d));
    
    //insert the value as label at the top of the bar
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
          .text(d=>d)
          .attr("x",(d,i)=> xLinearScale(i)+ barWidth/2)
          .attr("y",d=> sparkline.height- yLinearScale(d) + sparkline.label.yOffset)
          .attr("text-anchor","middle")
          .attr("fill",sparkline.label.color)
          .attr("font-family", sparkline.label.font.family)
          .attr("font-size",sparkline.label.font.size)
        
});
