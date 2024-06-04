let menu;
let font;
let bg;
let seeds;
let gameController;

let POINTS = 50;
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
let potatoExplotionSound;

//Projectiles
let imgProjectiles;
//Sun
let sunSprite;
let getSunSound;

//Zombies
let imgZombie;
let imgConeZombie;
let imgBucketZombie;
let zombieBite;
let zombies = [];
let zombieSpawnRate = 1000;
let frames = 0;

let coords = {
    rows: [
        100,
        200,
        300,
        400,
        500,
    ],
    cols: [
        225,
        280,
        360,
        440,
        520,
        580,
        640,
        720,
        780,
    ]
};
let gameWidth = 900;
let gameHeight = 600;

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
    potatoExplotionSound = loadSound("public/assets/music/potatoexplotesound.mp3");

    //SUN SPRITES
    sunSprite = loadImage("public/assets/images/sun.png")
    getSunSound = loadSound("public/assets/music/getsun.ogg");

    // ZOMBIES SPRITES
    imgZombie = loadImage("public/assets/images/zombie.png");
    imgConeZombie = loadImage("public/assets/images/conezombie.png");
    imgBucketZombie = loadImage("public/assets/images/bucketzombie.png");
    zombieBite = loadSound("public/assets/music/zombiebite.ogg");

    imgProjectiles = loadImage("public/assets/images/bullets.png");
    menuBackground = loadImage("public/assets/images/menuBackground.png");
    gameBackground = loadImage("public/assets/images/game-background.png");
    font = loadFont('public/assets/fonts/Samdan.ttf');
}

function setup() {
    createCanvas(gameWidth, gameHeight);
    menu = true;
    settings = false;
    gameSoundAlreadyStart = false;
    musicActive = true;
    gameController = new GameController(bg, seeds, POINTS, getSunSound);

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
    plants.push(new Sunflower(sunflower, coords.cols[0], coords.rows[3],sunSprite,getSunSound));
    plants.push(new PeaShooter(peaShooter, coords.cols[0], coords.rows[0], imgProjectiles));
    plants.push(new PeaShooter(peaShooter, coords.cols[1], coords.rows[1], imgProjectiles));
    plants.push(new PeaShooter(peaShooter, coords.cols[2], coords.rows[2], imgProjectiles));
    plants.push(new PeaShooter(peaShooter, coords.cols[3], coords.rows[3], imgProjectiles));
    plants.push(new PeaShooter(peaShooter, coords.cols[4], coords.rows[4], imgProjectiles));
    plants.push(new Nut(nut, coords.cols[8], coords.rows[1]));
    plants.push(new Nut(nut, coords.cols[6], coords.rows[2]));
    plants.push(new Nut(nut, coords.cols[5], coords.rows[3]));
    plants.push(new PotatoMine(potatomine, coords.cols[7], coords.rows[3],potatoExplotionSound));
}

function toggleMute() {
    musicActive = !musicActive;
    menuSound.pause();
    gameSound.pause();
}

function toggleMusic() {
    if (menu) {
        if (menuSound.isPlaying()) {
            menuSound.pause();
        } else {
            if (musicActive) {
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
    gameSound.setVolume(volume);
    zombieBite.setVolume(volume);
    getSunSound.setVolume(volume);
    potatoExplotionSound.setVolume(volume);
}

function keyPressed() {
    if (keyCode === ENTER) {
        menu = false;
        if (!menu && !gameSound.isPlaying()) {
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

function mousePressed() {
    console.log('\nMouseX: ' + mouseX + '\nMouseY: ' + mouseY);
    if (mouseX > 160 && mouseX < 475 && mouseY > 7 && mouseY < 63) {
        if (mouseX >= 221 && mouseX<286) {
            gameController.selectPlant('sunflower');
        } else if (mouseX > 166 && mouseX<221) {
            gameController.selectPlant('peashooter');
        } else if (mouseX < 480 && mouseX>=412) {
            gameController.selectPlant('repeater');
        } else if (mouseX < 350 && mouseX>=286) {
            gameController.selectPlant('nut');
        } else if (mouseX < 412 && mouseX>=355) {
            gameController.selectPlant('potatomine');
        }
    } else {
        gameController.placePlant(mouseX, mouseY, plants);
        gameController.selectPlant(null);
    }

    gameController.checkSunClicked(mouseX, mouseY);
    plants.forEach(plant => {
        if (plant instanceof Sunflower) {
            plant.checkSunClicked(mouseX, mouseY, gameController);
        }
    });
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
            image(gameBackground, 0, 0, 1200, 600);
            gameController.renderHud();
            plants.forEach(p => {
                p.update();
            });

            // Spawn zombies at regular intervals
            if (frames % zombieSpawnRate == 0) {
                zombies.push(new DefaultZombie(imgZombie, width, random(coords.rows), zombieBite));
                zombies.push(new ConeHeadZombie(imgConeZombie, width, random(coords.rows), zombieBite));
                zombies.push(new BucketHeadZombie(imgBucketZombie, width, random(coords.rows), zombieBite));
            }
            frames++;

            if (gameController.lives <= 0) {
                noLoop();
                fill('black');
                textSize(50);
                textAlign(CENTER);
                text("GAME OVER", width / 2, height / 2);
            }

            // Update and display the zombies
            for (let i = zombies.length - 1; i >= 0; i--) {
                zombies[i].update();
                zombies[i].display();
                if (zombies[i].x < 200) {
                    zombies.splice(i, 1);
                    gameController.lives--;
                }
            }
            gameController.updateSuns(); // Update suns
            gameController.spawnSun(sunSprite, gameWidth, gameHeight); // Spawn new suns
        } else {
            filter(BLUR, 3);
        }
    }
}

