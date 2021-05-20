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
let activeFish = [];

selectFish.addEventListener('change', (event) => {
    currentFish = event.target.value;
});

const image = new Image(100, 100);
image.src = 'img/neon tetra.png';

//add in options, good for test
const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => {
    //switch goes here
    activeFish.push({
        image: image,
        x: 0,
        y: 0
    });
});

 //canvas setup
const canvas = document.getElementById('fishcontainer');
const ctx = canvas.getContext('2d');
canvas.width = 958
canvas.height = 504

function drawFish() {
    activeFish.forEach(({image, x, y}) => {
        ctx.drawImage(image, mouse.x - image.width/2, mouse.y - image.height/2);
    })
}

function updateFish() {
    activeFish = activeFish.map(({x, y, ...rest}) => {
        return {x: x + mouse.x * 0.008, y: y + mouse.y * 0.008, ...rest};
    })
}

//mouse interaction
const mouse = {
    x: null,
    y: null,
    //click: false
}
canvas.addEventListener('mousemove', function(event){
    let canvasPosition = canvas.getBoundingClientRect();
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFish();
    //updateFish();
    requestAnimationFrame(animate);
}
animate();
