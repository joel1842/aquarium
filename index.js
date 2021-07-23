// fish selector 
const selectFish = document.getElementById('fishes');
const makeFish = (value, name) => ({ value, name, flip: false });
const appendFish = (option) => {
    selectFish.innerHTML += option;
}
const fillFishSelectWithOptions = (fish) => {
    return `<option value="${fish.value}">${fish.name}</option>`;
}
let listFish = [
    makeFish("fish1", "Golden Gourami"),
    makeFish("fish2", "Pearl Gourami"),
    makeFish("fish3", "Neon Tetra"),
    makeFish("fish4", "Siamese Algea Eater")
];
listFish.map(fillFishSelectWithOptions).forEach(appendFish);

let currentFish = "";
let activeFish = [];

selectFish.addEventListener('change', (event) => {
    currentFish = event.target.value
});

//fish image links
const goldGourami = new Image(150, 75);
goldGourami.src = 'img/gold-gourami.png';
goldGourami.speed = 0.7;

const pearlGourami = new Image(150, 70);
pearlGourami.src = 'img/pearl-gourami.png';
pearlGourami.speed = 0.8;

const neonTetra = new Image(80, 35);
neonTetra.src = 'img/neon-tetra.png';
neonTetra.speed = 1.5;

const siameseAlgea = new Image(150, 70);
siameseAlgea.src = 'img/siamese-algea-eater.png';
siameseAlgea.speed = 1.0;

//fish switch
function switchFish() {  
    if (currentFish === 'fish1') {
        activeFish.push({
            image: goldGourami,
            x: 150,
            y: 150,
            tx: 0,
            ty: 0,
            speed: goldGourami.speed,
        })
    } if (currentFish === 'fish2') {
        activeFish.push({
            image: pearlGourami,
            x: 150,
            y: 150,
            tx: 0,
            ty: 0,
            speed: pearlGourami.speed,
        })
    } if (currentFish === 'fish3') {
        activeFish.push({
            image: neonTetra,
            x: 150,
            y: 150,
            tx: 0,
            ty: 0,
            speed: neonTetra.speed,
        })
    } if (currentFish === 'fish4') {
        activeFish.push({
            image: siameseAlgea,
            x: 150,
            y: 150,
            tx: 0,
            ty: 0,
            speed: siameseAlgea.speed
        })
    }
}

const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => {
    switchFish();
})

let getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

//canvas setup
let canvas = document.getElementById('fishcontainer');
let ctx = canvas.getContext('2d');
let fishSize = 1;

initialize();

function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas() {
    canvas = document.getElementById("fishcontainer");
    canvas.getBoundingClientRect();
    if (window.innerWidth > 1050) {
        canvas.width = 1000;
        canvas.height = 625;
        fishSize = 1;
    } else if (window.innerWidth > 850) {
        canvas.width = 800;
        canvas.height = 500;
        fishSize = 0.75;
    } else if (window.innerWidth > 700) { 
        canvas.width = 667;
        canvas.height = 417;
        fishSize = 0.6;
    } else if (window.innerWidth > 550) { 
        canvas.width = 500;
        canvas.height = 312;
        fishSize = 0.5;
    } else if (window.innerWidth > 350){
        canvas.width = 400;
        canvas.height = 250;
        fishSize = 0.4;
    }
}
//drawing and direction
function drawAllFish() {
    activeFish.forEach(({ image, x, y, flip }) => {
        if (flip) {
            ctx.drawImage(image, x - image.width /4, y - image.height /4 , image.width * fishSize, image.height * fishSize);
        } else {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(-1, 1);
            ctx.drawImage(image, - image.width /4, - image.height /4, image.width * fishSize, image.height * fishSize);
            ctx.restore();
        }
    })
}

//mouse interaction
function updateAllFish(time) {
    activeFish = activeFish.map(({ x, y, tx, ty, speed, ...rest }) => {
        let newTx = tx;
        let newTy = ty;
        let dx = (tx - x) * time * speed;
        let dy = (ty - y) * time * speed;
        if (mouse.mousedown) {
            newTx = mouse.x;
            newTy = mouse.y;
        } else if ((tx - x < 5) && (ty - y < 5)) {
            newTx = getRandomArbitrary(0.2, 0.8) * canvas.width;
            newTy = getRandomArbitrary(0.2, 0.8) * canvas.height;
        }
        return { x: x + dx, y: y + dy, tx: newTx, ty: newTy, speed, ...rest, flip: dx > 0 };
    });
}

const mouse = {
    mousedown: false,
    x: canvas.width/2,
    y: canvas.height/2,
}

canvas.addEventListener('mousedown', function (event) {
    mouse.mousedown = true;
})

canvas.addEventListener('mouseup', function (event) {
    mouse.mousedown = false;
})

canvas.addEventListener('mousemove', function (event) {
    let canvasPosition = canvas.getBoundingClientRect();
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})

//animate
let lastTime = Date.now();
function animate() {
    let currentTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllFish();
    updateAllFish((currentTime - lastTime) / 1200);
    requestAnimationFrame(animate);
    lastTime = Date.now();
}
animate();

const reset = document.getElementById('clear-fish');
reset.addEventListener('click', () => {
    activeFish = [];
});

function alertClear() {
    let x = document.getElementById('alert-1');
    let y = document.getElementById('alert-2')
    x.style.display = 'none';
    y.style.display = 'flex';
}

function resetClear() {
    y = document.getElementById('alert-2')
    y.style.display = 'none';
}

let alertSwitch = document.getElementById('tank-button');
alertSwitch.addEventListener('click', () => {
    alertClear();
});

const resetSwitch = document.getElementById('clear-fish');
resetSwitch.addEventListener('click', () => {
    resetClear();
})

const cardAddFish = document.getElementById('card-button1');
cardAddFish.addEventListener('click', () => {
    alertClear();
    window.scrollTo(0,175);
    activeFish.push({
        image: goldGourami,
        x: 150,
        y: 150,
        tx: 0,
        ty: 0,
        speed: goldGourami.speed,
    })
})

const cardAddFish2 = document.getElementById('card-button2');
cardAddFish2.addEventListener('click', () => {
    alertClear();
    window.scrollTo(0,175);
    activeFish.push({
        image: pearlGourami,
        x: 150,
        y: 150,
        tx: 0,
        ty: 0,
        speed: pearlGourami.speed,
    })
})

const cardAddFish3 = document.getElementById('card-button3');
cardAddFish3.addEventListener('click', () => {
    alertClear();
    window.scrollTo(0,175);
    activeFish.push({
        image: neonTetra,
        x: 150,
        y: 150,
        tx: 0,
        ty: 0,
        speed: neonTetra.speed,
    })
})

const cardAddFish4 = document.getElementById('card-button4');
cardAddFish4.addEventListener('click', () => {
    alertClear();
    window.scrollTo(0,175);
    activeFish.push({
        image: siameseAlgea,
        x: 150,
        y: 150,
        tx: 0,
        ty: 0,
        speed: siameseAlgea.speed,
    })
})