document.body.innerHTML = `<h1>Hello from d3 version ${d3.version}</h1>`;

/**
 * map a discrete set of domain values to a discrete set of target values
 * Any value in domain will be mapped to "red", "white" or "green" 
 * The input domain is split into N intervals where N is the number of discrete values 
 * defined in the target range array
 */
const ordinalScale = d3.scaleOrdinal()
.domain(["poor","good", "great"])
.range(["red","white","green"]); // three discrete values defined as target

console.log(`domain value ${"poor"} is converted into range value: ${ordinalScale("poor")}`);
console.log(`domain value ${"good"} is converted into range value: ${ordinalScale("good")}`);
console.log(`domain value ${"great"} is converted into range value: ${ordinalScale("great")}`);

