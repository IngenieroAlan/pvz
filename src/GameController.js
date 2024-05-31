class GameController {
    constructor(bg, seeds, points) {
        this.bg = bg;
        this.seeds = seeds;
        this.points = points;
        this.suns = [];
        this.frameSinceLastSun = 0;
        this.lives = 3;
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
                this.suns.splice(i, 1);
                this.points += 50; // Increment points for clicking a sun
                break;
            }
        }
    }
}
