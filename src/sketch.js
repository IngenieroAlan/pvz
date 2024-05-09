let menu;
let font;
let menuBackground;
let menuSound;
let button;

function preload() {
    soundFormats('mp3', 'ogg');
    menuSound = loadSound('public/assets/music/main_menu_soundtrack.ogg');
    menuBackground = loadImage("public/assets/images/menuBackground.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    menu = true;

    // Crear el botón
    button = createButton('Play music');
    button.position(width - 80, 20);
    button.mousePressed(toggleMusic);

    if (menu == true) {
        image(menuBackground, 0, 0, 900, 600);
        filter(BLUR, 3);
        textFont(font);
        textSize(50);
        textAlign(CENTER);
        text("Press ENTER to start", 400, 300);
    }
}

function toggleMusic() {
    if (menuSound.isPlaying()) {
        menuSound.stop();
    } else {
        menuSound.play();
    }
}

function draw() {
    if(!menu){
        menuSound.stop();
    }
}
