// fish selector 
const selectFish = document.getElementById('fishes');
const makeFish = (value, name) => ({value, name});
const appendFish = (option) => {
    selectFish.innerHTML += option;
}
const makeOption = (fish) => {
    return `<option value="${fish.value}">${fish.name}</option>`;
}
let listFish = [
    makeFish("fish1", "Golden Gourami"),
    makeFish("fish2", "Pearl Gourami"),
    makeFish("fish3", "Neon Tetra"),
    makeFish("fish4", "Siamese Algea Eater")
];
listFish.map(makeOption).forEach(appendFish);

let currentFish = "";

selectFish.addEventListener('change', (event) => {
    currentFish = event.target.value;
});

const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => {
    console.log(currentFish)
});

// canvas setup
const neonTetra = new Image();

neonX = 400;
neonY = 200;

function init() {
    neonTetra.src = 'img/neon tetra.png'
    window.requestAnimationFrame(draw);
}

function draw() {
    const ctx = document.getElementById('fishcontainer').getContext('2d');
    //neon tetra
    ctx.save();
    ctx.translate(neonX, neonY);
    ctx.drawImage(neonTetra, 0, 0);
    
    window.requestAnimationFrame(draw);
}

init();






//const image = new Image();
//image.onload = () => {
//canvas.width = image.width;
//canvas.height = image.height;
//ctx.drawImage(image, 0, 0);
//}
//image.src = "img/fishtank.png";

//line
//ctx.beginPath();
//ctx.moveTo(100, 100);
//ctx.lineTo(800, 400);
//ctx.lineTo(400, 400);
//ctx.lineTo(500, 100);
//ctx.lineTo(100, 100);
//ctx.strokeStyle = "red";
//ctx.stroke();

//arc circle
//for (let i = 0; i < 5; i++) {
//    let x = Math.random() * canvas.width;
//    let y = Math.random() * canvas.height;
//    ctx.beginPath();
//    ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//    ctx.strokeStyle = "blue";
//    ctx.stroke();
//}
