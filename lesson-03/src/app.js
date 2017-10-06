document.body.innerHTML = `<h1>Hello from d3 version ${d3.version}</h1>`;

const firstJanuary2017 = new Date(2017,0,1);
const firstJune2017 = new Date(2017,6,1);
const now = new Date();

const timeScale = d3.scaleTime()
    .domain([firstJanuary2017,now])
    .range([0,100]);

console.log(`domain value ${firstJanuary2017} is converted into range value: ${timeScale(firstJanuary2017)}`);
console.log(`domain value ${firstJune2017} is converted into range value: ${timeScale(firstJune2017)}`);
console.log(`domain value ${now} is converted into range value: ${timeScale(now)}`);

//To get the date that is at the middle of the range
const dateInTheMiddleOfTheRange = timeScale.invert(50);
console.log(`domain value ${dateInTheMiddleOfTheRange} is in the middle of the range`);