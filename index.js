// fish selector 
const selectFish = document.getElementById('fishes');
const makeFish = (value, name) => ({ value, name, flip: false });
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
    currentFish = event.target.value
});

//fish image links
const neonTetra = new Image(80, 35);
neonTetra.src = 'img/neon-tetra.png';
neonTetra.speed = 1.5;

const goldGourami = new Image(150, 75);
goldGourami.src = 'img/gold-gourami.png';
goldGourami.speed = 0.7;

const pearlGourami = new Image(150, 70);
pearlGourami.src = 'img/pearl-gourami.png';
pearlGourami.speed = 0.8;

const siameseAlgea = new Image(150, 70);
siameseAlgea.src = 'img/siamese-algea-eater.png';
siameseAlgea.speed = 1.0;

//fish switch
const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => {
    switch (currentFish) {
        case 'fish1':
            activeFish.push({
                image: goldGourami,
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                speed: goldGourami.speed,
            })
            break;
        case 'fish2':
            activeFish.push({
                image: pearlGourami,
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                speed: pearlGourami.speed,
            })
            break;
        case 'fish3':
            activeFish.push({
                image: neonTetra,
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                speed: neonTetra.speed,

            })
            break;
        case 'fish4':
            activeFish.push({
                image: siameseAlgea,
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                speed: siameseAlgea.speed,
            })
    }
});
//todo: change to anonymous function
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//canvas setup
let ctx;
const canvas = document.getElementById('fishcontainer');
function canvasResize() {
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext('2d');
} 
window.addEventListener("resize", canvasResize);
canvasResize();

window.onload = window.onresize = function() {
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}
//drawing and direction, not working properly
function drawFish() {
    activeFish.forEach(({ image, x, y, speed, flip }) => {
        if (flip) {
            ctx.drawImage(image, x - image.width / 2, y - image.height / 2);
        } else {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(-1, 1);
            ctx.drawImage(image, -image.width / 2, - image.height / 2);
            ctx.restore();
        }
    })
}

//mouse interaction
function updateFish(time) {
    activeFish = activeFish.map(({ x, y, tx, ty, speed, ...rest }) => {
        let dx = (tx - x) * time * speed;
        let dy = (ty - y) * time * speed;
        let newTx = tx;
        let newTy = ty;
        if (mouse.mousedown) {
            newTx = mouse.x;
            newTy = mouse.y;
        }
        if ((tx - x < 5) && (ty - y < 5)) {
            newTx = getRandomArbitrary(0.1, 0.9) * canvas.width;
            newTy = getRandomArbitrary(0.1, 0.9) * canvas.height;
        }
        return { x: x + dx, y: y + dy, tx: newTx, ty: newTy, speed, ...rest, flip: dx > 0 };
    });
}

const mouse = {
    mousedown: false,
    x: canvas.width/2,
    y: canvas.height/2,
}
//todo: handle mouse position via mousemove
canvas.addEventListener('mousedown', function (event) {
//    let canvasPosition = canvas.getBoundingClientRect();
//    mouse.x = event.x - canvasPosition.left;
//    mouse.y = event.y - canvasPosition.top;
    mouse.mousedown = true;
})

canvas.addEventListener('mouseup', function (event) {
//    let canvasPosition = canvas.getBoundingClientRect();
//    mouse.x = event.x - canvasPosition.left;
//    mouse.y = event.y - canvasPosition.top;
    mouse.mousedown = false;
})

//animate
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


const reset = document.getElementById('clear-fish');
reset.addEventListener('click', () => {
    activeFish = [];
});

//function alertClear() {
//    let x = document.getElementById('alert-info');
//    let y = document.getElementById('alert-success')
//    if (x.style.display === 'none'){
//        y.style.display = 'flex';
//    } else {
//        x.style.display = 'none';
//        
//    }
//}

const alertSwitch = document.getElementById('tank-button');
alertHide.addEventListener('click', () => {
    alertClear();
});