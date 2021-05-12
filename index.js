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

 //canvas setup
const canvas = document.getElementById('fishcontainer');
const ctx = canvas.getContext('2d');
canvas.width = 958
canvas.height = 504

const image = new Image(100, 100);

image.src = 'img/neon tetra.png';

//fix static subtraction
function drawImage() {
    ctx.drawImage(image, mouse.x - 50, mouse.y - 50);
}

//mouse interaction
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

const mouse = {
    x: null,
    y: null,
}
//find alternative solution
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y);
})

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();
    requestAnimationFrame(animate);
}
animate();