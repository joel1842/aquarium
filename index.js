// fish selector 
const selectFish = document.getElementById('fishes');
const makeFish = (fish) => ({ ...fish, flip: false });

const fishList = [
    {value: "fish1", name: "Golden Gourami", img: 'img/gold-gourami.png', speed: 0.7},
    {value: "fish2", name: "Pearl Gourami", img: 'img/pearl-gourami.png', speed: 0.8},
    {value: "fish3", name: "Neon Tetra", img: 'img/neon-tetra.png', speed: 1.5},
    {value: "fish4", name: "Siamese Algea Eater", img: 'img/siamese-algea-eater.png', speed: 1.0}
].map(makeFish);

const appendFish = (option) => 
    selectFish.innerHTML += option;

const fillFishSelectWithOptions = ({value, name}) => 
    `<option value="${value}">${name}</option>`;

fishList.map(fillFishSelectWithOptions).forEach(appendFish);

let currentFish = "";
let activeFish = [];

selectFish.addEventListener('change', ({ target }) => {
    currentFish = target.value
});

// fish switch
const switchFish = (fish) => {  
    const { img, speed } = fishList.find(({value}) => value === fish);
    const fishImg = new Image(150, 75)
    fishImg.src = img;
    activeFish.push({
        x: 150,
        y: 150,
        tx: 0,
        ty: 0,
        image: fishImg,
        speed
    })
}

const addFish = document.getElementById('tank-button');
addFish.addEventListener('click', () => switchFish(currentFish));

const getRandomArbitrary = (min, max) => 
    Math.random() * (max - min) + min;

// canvas setup
let canvas = document.getElementById('fishcontainer');
const ctx = canvas.getContext('2d');
let fishSize = 1;

const initialize = () => {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

let lightOff = false;
const lightSwitch = document.getElementById('lightswitch');
lightSwitch.addEventListener('click', () => {
    if (!lightOff) lightOff = true;
    else lightOff = false;
})

// drawing and direction
const drawAllFish = () => {
    if (lightOff) {
        ctx.filter = 'grayscale(0.85)';
        canvas.style.filter = 'grayscale(85%)';
    } else {
        ctx.filter = 'none';
        canvas.style.filter = 'none';
    }
    ctx.filter = 'drop-shadow(1px 1px 3px #404040)'
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

// mouse interaction
const updateAllFish = (time) => {
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

// animate
let lastTime = Date.now();
const animate = () => {
    let currentTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllFish();
    updateAllFish((currentTime - lastTime) / 2000);
    requestAnimationFrame(animate);
    lastTime = Date.now();
}

animate();

const resizeCanvas = () => {
    canvas = document.getElementById("fishcontainer");
    canvas.getBoundingClientRect();
    const width = window.innerWidth * 0.8
    const height = width * 0.625
    canvas.width = width
    canvas.height = height
    fishSize = width / 1000
    const xClip = width * 0.022
    const yClip = height * 0.1456
    const widthClip = width - (xClip * 2)
    const heightClip = height - (yClip + (height * 0.048))
    ctx.rect(xClip, yClip, widthClip, heightClip)
    ctx.clip()
}

initialize();

const reset = document.getElementById('clear-fish');
reset.addEventListener('click', () => {
    activeFish = [];
});

const alertClear = () => {
    let x = document.getElementById('alert-1');
    let y = document.getElementById('alert-2')
    x.style.display = 'none';
    y.style.display = 'flex';
}

const resetClear = () => {
    y = document.getElementById('alert-2')
    y.style.display = 'none';
}

const alertSwitch = document.getElementById('tank-button');
alertSwitch.addEventListener('click', () => {
    alertClear();
});

const resetSwitch = document.getElementById('clear-fish');
resetSwitch.addEventListener('click', () => {
    resetClear();
})

const handleAddFishFromCard = (fish) => {
    alertClear();
    window.scrollTo(0,175);
    switchFish(fish)
}

fishList.map(({value}, i) => {
    const fish = document.getElementById(`card-button${i+1}`);
    fish.addEventListener('click', () => handleAddFishFromCard(value))
})