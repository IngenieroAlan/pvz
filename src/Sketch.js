let menu;
let font;
let seeds;
let gameController;
//BACKGROUNDS
let gameBackground;
let bglv2;
let bglv3;

let POINTS = 50;
let btnMenu;
let menuBackground;
let settings;
let btnSettings;
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
//Buffs
let imgBuffs;
//Sun
let sunSprite;
let getSunSound;

//Zombies
let imgZombie;
let imgConeZombie;
let imgBucketZombie;
let imgZombiestein;
let zombieBite;
let zombies = [];
let zombieSpawnRate = 1000;
let zombiesLvl = [
  // array to store zombies of level 1 for each row (default zombies and conehead zombies)
  [
    [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2],
    [0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2],
    [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2],
  ],
  // array to store zombies of level 2 for each row (buckethead zombies)
  [
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3],
    [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3, 3, 3],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 3, 1, 3, 3, 3],
    [0, 1, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 3, 3, 3],
    [0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3],
  ],
  // array to store zombies of level 3 for each row (zombiestein)
  [
    [0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4],
    [1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 4, 4, 4],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 4, 4],
    [0, 1, 1, 1, 1, 4, 1, 4, 1, 1, 4, 1, 4, 4, 4],
    [0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4],
  ],
];
let spawnFrame = 0;
let frames = 0;

let coords = {
  rows: [100, 200, 300, 400, 500],
  cols: [225, 280, 360, 440, 520, 580, 640, 720, 780],
};
let gameWidth = 900;
let gameHeight = 600;

function preload() {
  soundFormats("mp3", "ogg");
  menuSound = loadSound("public/assets/music/main_menu_soundtrack.ogg");
  gameSound = loadSound("public/assets/music/grasswalk.mp3");
  seeds = loadImage("public/assets/images/seeds.png");
  //BACKGROUNDS SPRITES
  bg = loadImage("public/assets/images/bg.png");
  gameBackground = loadImage("public/assets/images/game-background.png");
  bglv2 = loadImage("public/assets/images/bgnight.png");
  bglv3 = loadImage("public/assets/images/bgwildwest.png");

  // PLANTS SPRITES
  sunflower = loadImage("public/assets/images/sunflower.png");
  peaShooter = loadImage("public/assets/images/peashooter.png");
  repeater = loadImage("public/assets/images/repeater.png");
  nut = loadImage("public/assets/images/nut.png");
  potatomine = loadImage("public/assets/images/potatomine.png");
  potatoExplotionSound = loadSound(
    "public/assets/music/potatoexplotesound.mp3"
  );

  //SUN SPRITES
  sunSprite = loadImage("public/assets/images/sun.png");
  getSunSound = loadSound("public/assets/music/getsun.ogg");

  // ZOMBIES SPRITES
  imgZombie = loadImage("public/assets/images/zombie.png");
  imgConeZombie = loadImage("public/assets/images/conezombie.png");
  imgBucketZombie = loadImage("public/assets/images/bucketzombie.png");
  imgZombiestein = loadImage("public/assets/images/zombieyeti.png");
  zombieBite = loadSound("public/assets/music/zombiebite.ogg");

  imgBuffs = loadImage("public/assets/images/upgrades.png");
  imgProjectiles = loadImage("public/assets/images/bullets.png");
  menuBackground = loadImage("public/assets/images/menuBackground.png");
  font = loadFont("public/assets/fonts/Samdan.ttf");
}

function setup() {
  createCanvas(gameWidth, gameHeight);
  menu = true;
  settings = false;
  gameSoundAlreadyStart = false;
  musicActive = true;
  bglv3 = bglv3.get(70,45,655,315);
  gameController = new GameController(gameBackground, seeds, POINTS, getSunSound);

  btnMenu = createButton("Play music");
  btnMenu.position(width - 150, 20);
  btnMenu.mousePressed(toggleMusic);

  btnMuteMusic = createButton("Mute");
  btnMuteMusic.position(width - 60, 20);
  btnMuteMusic.mousePressed(toggleMute);

  btnSettings = createButton("Settings");
  btnSettings.position(width - 220, 20);
  btnSettings.mousePressed(toggleSettings);

  settingsPanel = createDiv();
  settingsPanel.position(200, 100);
  settingsPanel.size(500, 400);
  settingsPanel.style("background-color", "#c2a0ce");
  settingsPanel.style("border", "2px solid #2e0e36");
  settingsPanel.style("border-radius", "10px");
  settingsPanel.hide();

  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(width / 2 - 50, height / 2 - 50);
  volumeSlider.style("width", "100px");
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
  console.log("\nMouseX: " + mouseX + "\nMouseY: " + mouseY);
  if (mouseX > 160 && mouseX < 475 && mouseY > 7 && mouseY < 63) {
    if (
      mouseX >= 221 &&
      mouseX < 286 &&
      gameController.plantOnCooldown.sunflower === false
    ) {
      gameController.selectPlant("sunflower");
    } else if (
      mouseX > 166 &&
      mouseX < 221 &&
      gameController.plantOnCooldown.peashooter === false
    ) {
      gameController.selectPlant("peashooter");
    } else if (
      mouseX < 480 &&
      mouseX >= 412 &&
      gameController.lvl >= 3 &&
      gameController.plantOnCooldown.repeater === false
    ) {
      gameController.selectPlant("repeater");
    } else if (
      mouseX < 350 &&
      mouseX >= 286 &&
      gameController.lvl >= 2 &&
      gameController.plantOnCooldown.nut === false
    ) {
      gameController.selectPlant("nut");
    } else if (
      mouseX < 412 &&
      mouseX >= 355 &&
      gameController.lvl >= 3 &&
      gameController.plantOnCooldown.potatomine === false
    ) {
      gameController.selectPlant("potatomine");
    }
  } else {
    gameController.placePlant(mouseX, mouseY, plants);
  }
  gameController.checkSunClicked(mouseX, mouseY);
  plants.forEach((plant) => {
    if (plant instanceof Sunflower) {
      plant.checkSunClicked(mouseX, mouseY, gameController);
    }
  });
  // Comprobar si se hace clic en un potenciador
  for (let i = buffs.length - 1; i >= 0; i--) {
    if (gameController.buffs[i].isCollected(mouseX, mouseY)) {
      applyBuffToPlant(gameController.buffs[i]);
      gameController.buffs.splice(i, 1);
      break;
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
      fill("white");
      gameController.renderBackground();
      gameController.renderHud();
      plants.forEach((p) => {
        p.update();
      });

      // Spawn zombies at regular intervals
      if (frames % zombieSpawnRate == 0) {
        for (let i = 0; i < zombiesLvl[gameController.lvl - 1].length; i++) {
          switch (zombiesLvl[gameController.lvl - 1][i][spawnFrame]) {
            case 0:
              break;
            case 1:
              zombies.push(
                new DefaultZombie(imgZombie, width, coords.rows[i], zombieBite)
              );
              break;
            case 2:
              zombies.push(
                new ConeHeadZombie(
                  imgConeZombie,
                  width,
                  coords.rows[i],
                  zombieBite
                )
              );
              break;
            case 3:
              zombies.push(
                new BucketHeadZombie(
                  imgBucketZombie,
                  width,
                  coords.rows[i],
                  zombieBite
                )
              );
              break;
            case 4:
              zombies.push(
                new Zombiestein(
                  imgZombiestein,
                  width,
                  coords.rows[i],
                  zombieBite
                )
              );
              break;
          }
        }
        spawnFrame++;
      }
      frames++;

      if (gameController.lives <= 0) {
        noLoop();
        fill("black");
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
      gameController.changeLvl(gameController.lvl == 1 ? bglv2 : bglv3); // Checks if the level should be changed
    } else {
      filter(BLUR, 3);
    }
  }
}
