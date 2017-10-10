//load json data
d3.json("data/data.json",(data)=>{
    console.log("json data:", data);

    //compute a min value within data
    const min = d3.min(data,d => d.age);
    console.log(`min age in json data: ${min}` )

    //compute a max value within data
    const max = d3.max(data,d => d.age);
    console.log(`max age in json data: ${max}` )

    //get the data domain
    const domain = d3.extent(data, d => d.age);
    console.log(`data domain: ${domain}`, domain );

    //create a scale from the input data domain
    const linearScale = d3.scaleLinear()
                    .domain(domain)
                    .range([0,600]);
    console.log(`domain value ${0} is converted into range value: ${linearScale(0)}`);
    console.log(`range value ${300} is converted back into domain value: ${linearScale.invert(300)}`);
});

//load csv data
d3.csv("data/data.csv", (data)=>{
    console.log("csv data:", data);
});

//load tsv data
d3.tsv("data/data.tsv", (data)=>{
    console.log("tsv data:", data);
});