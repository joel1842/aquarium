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

//fish image links
const neonTetra = new Image(80, 35);
neonTetra.src = 'img/neon-tetra.png';

const goldGourami = new Image(150, 75);
goldGourami.src = 'img/gold-gourami.png';

const pearlGourami = new Image(150, 70);
pearlGourami.src = 'img/pearl-gourami.png';

const siameseAlgea = new Image(150,70);
siameseAlgea.src = 'img/siamese-algea-eater.png'; 

//fish switch
const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => {
    switch (currentFish) {
        case 'fish1':
            activeFish.push({
                image: goldGourami,
                x: 0,
                y: 0
            })
            break;
        case 'fish2':
            activeFish.push({
                image: pearlGourami,
                x: 0,
                y: 0
            })
            break;
        case 'fish3':
            activeFish.push({
                image: neonTetra,
                x: 0,
                y: 0
            })
            break;
        case 'fish4':
            activeFish.push({
                image: siameseAlgea,
                x: 0,
                y: 0
            })
    }
});

 //canvas setup
const canvas = document.getElementById('fishcontainer');
const ctx = canvas.getContext('2d');
canvas.width = 958
canvas.height = 504

function drawFish() {
    activeFish.forEach(({image, x, y}) => {
        ctx.drawImage(image, x - image.width/2, y - image.height/2);
    })
}

function updateFish(time) {
    activeFish = activeFish.map(({ x, y, ...rest }) => {
        const dx = (mouse.x - x) * time;
        const dy = (mouse.y - y) * time;
        return { x: x + dx, y: y + dy, ...rest };
    });
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

let lastTime = Date.now();
function animate() {
    let currentTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFish();
    updateFish((currentTime - lastTime) / 1000);
    requestAnimationFrame(animate);
    lastTime = Date.now();
}
animate();
