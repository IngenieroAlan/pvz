class GameController {
    constructor(bg, seeds, points, sunSounds) {
        this.bg = bg;
        this.seeds = seeds;
        this.points = points;
        this.suns = [];
        this.sunSounds = sunSounds;
        this.frameSinceLastSun = 0;
        this.lives = 3;
        this.selectedPlant = null; // Plant currently selected by the user
        this.plantCost = {
            'sunflower': 50,
            'peashooter': 100,
            'repeater': 200,
            'nut': 50,
            'potatomine': 150
        };
    }

    renderHud() {
        image(this.seeds, 160, 0, 320, 65);
        text("POINTS: " + this.points, 80, 50);
    }

    spawnSun(sunImage,width,height) {
        this.frameSinceLastSun++;
        if (this.frameSinceLastSun > 480) {
            let x = random(240, width - 100);
            let targetY = random(80,height-50);
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
                this.points += 50;
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

            if (col && row) {
                switch (this.selectedPlant) {
                    case 'sunflower':
                        plants.push(new Sunflower(sunflower, col, row, sunSprite, getSunSound));
                        break;
                    case 'peashooter':
                        plants.push(new PeaShooter(peaShooter, col, row, imgProjectiles));
                        break;
                    case 'repeater':
                        plants.push(new Repeater(repeater, col, row, imgProjectiles));
                        break;
                    case 'nut':
                        plants.push(new Nut(nut, col, row));
                        break;
                    case 'potatomine':
                        plants.push(new PotatoMine(potatomine, col, row, potatoExplotionSound));
                        break;
                }
                this.points -= this.plantCost[this.selectedPlant]; // Deduct points for the plant
                this.selectedPlant = null; // Reset the selected plant
            }
        }
    }
}
