document.body.innerHTML = `<h1>Hello from d3 version ${d3.version}</h1>`;

/**
 * map a continuous domain values to a discrete set of values
 * Any value in domain will be mapped to "red", "orange" or "green" 
 * The input domain is split into N intervals where N is the number of discrete values 
 * defined in the target range array
 */
const quantizeScale = d3.scaleQuantize()
.domain([0,100])
.range(["red","orange","green"]); // two discrete values defined as target

console.log(`domain value ${0} is converted into range value: ${quantizeScale(0)}`);
console.log(`domain value ${49} is converted into range value: ${quantizeScale(49)}`);
console.log(`domain value ${50} is converted into range value: ${quantizeScale(50)}`);
console.log(`domain value ${100} is converted into range value: ${quantizeScale(100)}`);


console.log(`discrete value ${"orange"} is mapped to input domain values: ${quantizeScale.invertExtent("orange")}`);
console.log(`domain value ${33} is converted into range value: ${quantizeScale(33)}`);
console.log(`domain value ${66} is converted into range value: ${quantizeScale(66)}`);
