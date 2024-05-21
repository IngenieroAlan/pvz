let menu;
let font;
let bg;
let seeds;
let gameController;

let POINTS = 1000;
let menuSound;
let btnMenu;
let btnSettings;
let gameBackground;
let settings;
let volumeSlider;
let settingsPanel;

function preload() {
    soundFormats('mp3', 'ogg');
    menuSound = loadSound('public/assets/music/main_menu_soundtrack.ogg');
    bg = loadImage("public/assets/images/bg.png");
    seeds = loadImage("public/assets/images/seeds.png");
    gameBackground = loadImage("public/assets/images/game-background.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    menu = false;
    settings = false;

    gameController = new GameController(bg, seeds, POINTS);

    btnMenu = createButton('Play music');
    btnMenu.position(width - 80, 20);
    btnMenu.mousePressed(toggleMusic);

    btnSettings = createButton('Settings');
    btnSettings.position(width - 160, 20);
    btnSettings.mousePressed(toggleSettings);
    
    settingsPanel = createDiv();
    settingsPanel.position(200, 100);
    settingsPanel.size(500, 400);
    settingsPanel.style('background-color', '#c2a0ce');
    settingsPanel.style('border', '2px solid #2e0e36');
    settingsPanel.style('border-radius', '10px');
    settingsPanel.hide();

    volumeSlider = createSlider(0, 1, 0.5, 0.01);
    volumeSlider.position(width / 2 - 50, height / 2 - 50);
    volumeSlider.style('width', '100px');
    volumeSlider.input(changeVolume);
    volumeSlider.hide();
}

function toggleMusic() {
    if (menuSound.isPlaying()) {
        menuSound.stop();
    } else {
        menuSound.play();
    }
}

function toggleSettings() {
    if (settings) {
        settings = false;
        volumeSlider.hide();
        settingsPanel.hide();
        
    } else {
        settings = true;
        showSettings();
        
    }
}

function showSettings() {
    settingsPanel.show();
    volumeSlider.show();
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Settings", width / 2, height / 2 - 120);
    text("Volume", width / 2, height / 2 - 50); 
}

function changeVolume() {
    let volume = volumeSlider.value();
    menuSound.setVolume(volume);
}

function draw() {
    if (menu) {
        if(!settings){
            image(menuBackground, 0, 0, 900, 600);
        }
        filter(BLUR, 3);
        textFont(font);
        textSize(50);
        textAlign(CENTER);
        text("Press ENTER to start", 400, 300);
    } else {
        menuSound.stop();
        if(!settings){
            textFont(font);
            textSize(32);
            fill('white');
            image(gameBackground, 0, 0, 900, 600);
            gameController.renderHud();
        }else{
            filter(BLUR, 3);
        }
    }
}
