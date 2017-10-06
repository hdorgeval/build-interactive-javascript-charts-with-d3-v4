document.body.innerHTML = `<h1>Hello from d3 version ${d3.version}</h1>`;

const linearScale = d3.scaleLinear()
                      .domain([0,100])
                      .range([0,1]);

console.log(`domain value ${0} is converted into range value: ${linearScale(0)}`);
console.log(`domain value ${100} is converted into range value: ${linearScale(100)}`);
console.log(`domain value ${50} is converted into range value: ${linearScale(50)}`);
console.log(`domain value ${120} is converted into range value: ${linearScale(120)}`);
console.log(`domain value ${-10} is converted into range value: ${linearScale(-10)}`);

//in order to threshold the data that are outside the target range do:

const clampedLinearScale = d3.scaleLinear()
                      .domain([0,100])
                      .range([0,1])
                      .clamp(true);

console.log(`domain value ${0} is converted into clamped range value: ${clampedLinearScale(0)}`);
console.log(`domain value ${100} is converted into clamped range value: ${clampedLinearScale(100)}`);
console.log(`domain value ${50} is converted into clamped range value: ${clampedLinearScale(50)}`);
console.log(`domain value ${120} is converted into clamped range value: ${clampedLinearScale(120)}`);
console.log(`domain value ${-10} is converted into clamped range value: ${clampedLinearScale(-10)}`);

//convert a range value back to the domain value
console.log(`range value ${0.5} is converted back into domain value: ${linearScale.invert(0.5)}`);