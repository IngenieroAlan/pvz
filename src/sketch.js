let menu;
let font;
let menuBackground;

function preload() {
    menuBackground = loadImage("public/assets/images/menuBackground.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    menu = true;
    if (menu == true) {
        image(menuBackground, 0, 0, 900, 600);
        filter(BLUR, 3);
        textFont(font);
        textSize(50);
        textAlign(CENTER);
        text("Press ENTER to start", 400, 300);
    }
}

function draw() {
}