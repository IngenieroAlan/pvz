class GameController {
    constructor(bg, seeds, points, sunSounds) {
        this.bg = bg;
        this.lvl = 1;
        this.seeds = [
            seeds.get(0, 0, 51, 26),
            seeds.get(0, 0, 76, 26),
            seeds.get(0, 0, 128, 26),
        ];
        this.points = points;
        this.suns = [];
        this.sunSounds = sunSounds;
        this.frameSinceLastSun = 0;
        this.buffs = [];
        this.lives = 3;
        this.selectedPlant = null; // Plant currently selected by the user
        this.plantCost = {
            'sunflower': 50,
            'peashooter': 100,
            'repeater': 200,
            'nut': 50,
            'potatomine': 150
        };
        this.plantOnCooldown = {
            sunflower: false,
            peashooter: false,
            repeater: false,
            nut: false,
            potatomine: false
        };
    }
    renderBackground() {
        this.lvl == 1 && image(this.bg, 0, 0, 1200, 600);
        this.lvl == 2 && image(this.bg, 0, 0, 1200, 600);
        this.lvl > 2 && image(this.bg, 0, 0, 1200, 600);
    }
    renderHud() {
        this.lvl == 1 ?
            image(this.seeds[0], 160, 0, 128, 65) :
            this.lvl == 2 ?
                image(this.seeds[1], 160, 0, 192, 65) :
                image(this.seeds[2], 160, 0, 320, 65);

        text("POINTS: " + this.points, 80, 50);
    }

    spawnSun(sunImage, width, height) {
        this.frameSinceLastSun++;
        if (this.frameSinceLastSun > 480) {
            let x = random(240, width - 100);
            let targetY = random(80, height - 50);
            this.suns.push(new Sun(sunImage, x, 0, targetY));
            this.frameSinceLastSun = 0;
        }
    }

    updateSuns() {
        for (let i = this.suns.length - 1; i >= 0; i--) {
            this.suns[i].update();
        }
    }

    checkSunClicked(mx, my) {
        for (let i = this.suns.length - 1; i >= 0; i--) {
            if (this.suns[i].isClicked(mx, my)) {
                this.sunSounds.play();
                this.suns.splice(i, 1);
                this.points += 25;
                break;
            }
        }
    }
    selectPlant(plantType) {
        this.selectedPlant = plantType;
        console.log(this.selectedPlant);
    }
    placePlant(x, y, plants) {
        if (this.selectedPlant && this.points >= this.plantCost[this.selectedPlant]) {
            let col = coords.cols.find(col => x > col - 40 && x < col + 40);
            let row = coords.rows.find(row => y > row - 40 && y < row + 40);

            let alredyPlanted = false
            plants.forEach(plant => {
                if (plant.x === col && plant.y === row) {
                    alredyPlanted = true
                }
            })

            if (col && row && !alredyPlanted) {
                switch (this.selectedPlant) {
                    case 'sunflower':
                        plants.push(new Sunflower(sunflower, col, row, sunSprite, getSunSound));
                        this.plantOnCooldown.sunflower = true;
                        setTimeout(() => {
                            this.plantOnCooldown.sunflower = false;
                        }, 5000);
                        break;
                    case 'peashooter':
                        plants.push(new PeaShooter(peaShooter, col, row, imgProjectiles));
                        this.plantOnCooldown.peashooter = true;
                        setTimeout(() => {
                            this.plantOnCooldown.peashooter = false;
                        }, 5000);
                        break;
                    case 'repeater':
                        plants.push(new Repeater(repeater, col, row, imgProjectiles));
                        this.plantOnCooldown.repeater = true;
                        setTimeout(() => {
                            this.plantOnCooldown.repeater = false;
                        }, 10000);
                        break;
                    case 'nut':
                        plants.push(new Nut(nut, col, row));
                        this.plantOnCooldown.nut = true;
                        setTimeout(() => {
                            this.plantOnCooldown.nut = false;
                        }, 20000);
                        break;
                    case 'potatomine':
                        plants.push(new PotatoMine(potatomine, col, row, potatoExplotionSound));
                        this.plantOnCooldown.potatomine = true;
                        setTimeout(() => {
                            this.plantOnCooldown.potatomine = false;
                        }, 10000);
                        break;
                }
                this.points -= this.plantCost[this.selectedPlant];
                this.selectedPlant = null;
            }
        }
    }

    changeLvl(bg) {
        for (let i = 0; i < zombiesLvl[gameController.lvl - 1].length; i++) {
            if (zombiesLvl[gameController.lvl - 1][i][spawnFrame] === undefined && zombies.length == 0) {
                this.lvl++;
                this.points = 50;
                this.bg = bg;
                // Remove all zombies and plants
                zombies = [];
                plants = [];
                this.suns = [];
                this.frameSinceLastSun = 0;
                this.selectedPlant = null;
                this.lives = 3;
                frames = 0;
                spawnFrame = 0;
                break;
            }
        }
    }
}
