let menu;
let font;
let bg;
let seeds;
let gameController;

let POINTS = 1000;
let btnMenu;
let menuBackground;
let settings;
let btnSettings;
let gameBackground;
let volumeSlider;
let settingsPanel;
let button;

//Music
let btnMuteMusic;
let menuSound;
let gameSound;
let musicActive;
//Plants
let plants = [];
let sunflower;
let peaShooter;
let nut;
let repeater;
let potatomine;
//Projectiles
let imgProjectiles;
let projectiles = [];

//Zombies
let imgZombie;
let zombies = [];
let zombieSpawnRate = 100;
let frames = 0;

let coords = {
    rows: [
        125,
        225,
        325,
        395,
        520
    ],
    cols: [
        200,
        150,
        225,
        160
    ]
};


function preload() {
    soundFormats('mp3', 'ogg');
    menuSound = loadSound('public/assets/music/main_menu_soundtrack.ogg');
    gameSound = loadSound('public/assets/music/grasswalk.mp3');
    bg = loadImage("public/assets/images/bg.png");
    seeds = loadImage("public/assets/images/seeds.png");
    // PLANTS SPRITES
    sunflower = loadImage("public/assets/images/sunflower.png");
    peaShooter = loadImage("public/assets/images/peashooter.png");
    repeater = loadImage("public/assets/images/repeater.png");
    nut = loadImage("public/assets/images/nut.png");
    potatomine = loadImage("public/assets/images/potatomine.png");

    // ZOMBIES SPRITES
    imgZombie = loadImage("public/assets/images/zombie.png");

    imgProjectiles = loadImage("public/assets/images/bullets.png");
    menuBackground = loadImage("public/assets/images/menuBackground.png");
    gameBackground = loadImage("public/assets/images/game-background.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(900, 600);
    menu = true;
    settings = false;
    gameSoundAlreadyStart = false;
    musicActive = true;
    gameController = new GameController(bg, seeds, POINTS);

    btnMenu = createButton('Play music');
    btnMenu.position(width - 150, 20);
    btnMenu.mousePressed(toggleMusic);

    btnMuteMusic = createButton('Mute');
    btnMuteMusic.position(width - 60, 20);
    btnMuteMusic.mousePressed(toggleMute);

    btnSettings = createButton('Settings');
    btnSettings.position(width - 220, 20);
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
    plants.push(new Sunflower(sunflower,coords.cols[3], coords.rows[3]));
    plants.push(new PeaShooter(peaShooter,coords.cols[2], coords.rows[2],imgProjectiles));
    plants.push(new Nut(nut,coords.cols[1], coords.rows[1]));
    plants.push(new PotatoMine(potatomine, coords.cols[2], coords.rows[3]));
}

function toggleMute(){
    musicActive = !musicActive;
    menuSound.pause();
    gameSound.pause();
}

function toggleMusic() {
    if (menu) {
        if (menuSound.isPlaying()) {
            menuSound.pause();
        } else {
            if(musicActive){
                menuSound.play();
            }
        }
    } else {
        if (gameSound.isPlaying()) {
            gameSound.pause();
        } else {
            if (musicActive) {
                gameSound.play();
            }
        }
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
        if(!menu && !gameSound.isPlaying()){
            gameSound.play();
        }
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
        if (!settings) {
            image(menuBackground, 0, 0, 900, 600);
        }
        filter(BLUR, 3);
        textFont(font);
        textSize(50);
        textAlign(CENTER);
        text("Press ENTER to start", 400, 300);
    } else {
        menuSound.stop();
        if (!settings) {
            clear();
            textFont(font);
            textSize(32);
            fill('white');
            image(gameBackground, 0, 0, 900, 600);
            gameController.renderHud();
            plants.forEach(p => {
                p.update();
            });

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
                zombies.push(new Zombie(width, random(coords.rows)));
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
        } else {
            filter(BLUR, 3);
        }
    }
}
