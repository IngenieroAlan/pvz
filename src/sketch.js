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
let menuBackground;
let button;
let plant;
let projectiles = [];
let zombies = [];
let zombieSpawnRate = 100; // Rate of zombie spawning
let frames = 0;

function preload() {
    soundFormats('mp3', 'ogg');
    menuSound = loadSound('public/assets/music/main_menu_soundtrack.ogg');
    bg = loadImage("public/assets/images/bg.png");
    seeds = loadImage("public/assets/images/seeds.png");
    menuBackground = loadImage("public/assets/images/menuBackground.png");
    gameBackground = loadImage("public/assets/images/game-background.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    menu = true;
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
    if (menu == true) {
        image(menuBackground, 0, 0, 900, 600);
        filter(BLUR, 3);
        textFont(font);
        textSize(50);
        textAlign(CENTER);
        text("Press ENTER to start", 400, 300);
    }

    plant = new Plant(50, height / 2);

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

function keyPressed() {
    if (keyCode === ENTER) {
        menu = false;
    } else if (keyCode === ESCAPE) {
        settings = !settings;
        if (settings) {
            showSettings();
        } else {
            settingsPanel.hide();
            volumeSlider.hide();
        }
    }
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
            clear();
            textFont(font);
            textSize(32);
            fill('white');
            image(gameBackground, 0, 0, 900, 600);
            gameController.renderHud();

            // Update and display the plant
            plant.update();
            plant.display();
            
            // Update and display the projectiles
            for (let i = projectiles.length - 1; i >= 0; i--) {
                projectiles[i].update();
                projectiles[i].display();
                if (projectiles[i].offscreen()) {
                    projectiles.splice(i, 1);
                } else {
                    // Check for collisions with zombies
                    for (let j = zombies.length - 1; j >= 0; j--) {
                        if (projectiles[i].hits(zombies[j])) {
                            zombies.splice(j, 1);
                            projectiles.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            
            // Spawn zombies at regular intervals
            if (frames % zombieSpawnRate == 0) {
                zombies.push(new Zombie(width, random(height)));
            }
            frames++;
            
            // Update and display the zombies
            for (let i = zombies.length - 1; i >= 0; i--) {
                zombies[i].update();
                zombies[i].display();
                if (zombies[i].offscreen()) {
                    zombies.splice(i, 1);
                }
            }
        }else{
            filter(BLUR, 3);
        }
    }
}
