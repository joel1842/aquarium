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
const canvas = document.getElementById('fishcontainer');
const ctx = canvas.getContext('2d');


const image = new Image();
image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
}
image.src = "img/fishtank.png";










































// //canvas setup
// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// canvas.width = 800;
// canvas.height = 500;

// let score = 0;
// let gameFrame = 0;
// ctx.font = '50px Helvetica Neue';

// //mouse interactivity
// let canvasPosition = canvas.getBoundingClientRect();
// const mouse = {
//     x: canvas.width/2,
//     y: canvas.height/2,
//     click: false
// }
// canvas.addEventListener('mousedown', function(event){
//     mouse.click = true;
//     mouse.x = event.x; - canvasPosition.left;
//     mouse.y = event.y; - canvasPosition.right;
// });
// canvas.addEventListener('mouseup', function(){
//     mouse.click = false;
// });


// //player
// class Player {
//     constructor(){
//         this.x = canvas.width/2;
//         this.y = canvas.height/2;
//         this.radius = 50;
//         this.angle = 0; 
//         this.frameX = 0;
//         this.frameY = 0;
//         this.frame = 0;
//         this.spriteWidth = 100;
//         this.spriteHeight = 100;
//     }
//     update(){
//         const dx = this.x - mouse.x;
//         const dy = this.y - mouse.y;
//         if (mouse.x != this.x) {
//             this.x -= dx/30;
//         }
//         if (mouse.y != this.y) {
//             this.y -= dy/30;
//         }
//     }
//     draw(){
//         if (mouse.click) {
//             ctx.lineWidth = 0.2;
//             ctx.beginPath();
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(mouse.x, mouse.y);
//             ctx.stroke();
//         }
//         ctx.fillStyle = 'red';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
//         ctx.fill();
//         ctx.closePath();
//     }
// };

// const player = new Player();

// //bubbles
// const bubblesArray = [];
// class Bubble {
//     constructor(){
//         this.x = Math.random() * canvas.width;
//         this.y = canvas.height + 100 + Math.random() * canvas.height;
//         this.radius = 50;
//         this.speed = Math.random() * 5 + 1;
//         this.distance;

//     }
//     update(){
//         this.y -= this.speed;
//         const dx = this.x - player.x;
//         const dy = this.y - player.y;
//         this.distance = Math.sqrt(dx*dy)
//     }
//     draw(){
//         ctx.fillStyle = 'blue';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.closePath();
//         ctx.stroke();
//     }
// }
// function handleBubbles(){
//     if (gameFrame % 50 == 0){
//         bubblesArray.push(new Bubble());
//     }
//     for (let i = 0; i < bubblesArray.length; i++){
//         bubblesArray[i].update();
//         bubblesArray[i].draw();

//     }
//     for (let i = 0; i < bubblesArray.length; i++){
//         if (bubblesArray[i] < 0 - this.radius * 2){
//             bubblesArray.splice(i,1);
//         }
//         if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius)
//     }
// }

// //animation loop
// function animate(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     handleBubbles();
//     player.update();
//     player.draw();
//     ctx.fillStyle = 'black';
//     ctx.fillText('score: ' + score, 10, 50);
//     gameFrame++;
//     requestAnimationFrame(animate);
// }
// animate();