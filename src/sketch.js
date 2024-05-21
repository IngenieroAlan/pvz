let menu;
let font;
let bg;
let seeds;
let gameController;

let POINTS = 1000;

function preload() {
    bg = loadImage("public/assets/images/bg.png");
    seeds = loadImage("public/assets/images/seeds.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    textFont(font);
    textSize(32);
    gameController = new GameController(bg, seeds, POINTS);
}

function draw() {
    gameController.renderHud();
}
