class GameController {
    constructor(bg, seeds, points) {
        this.bg = bg;
        this.seeds = seeds;
        this.points = points;
        this.sun = [];
        this.frameSinceLastSun = 0;
    }
    renderHud() {
        image(seeds, 160, 0, 320, 65);
        text("POINTS: " + this.points, 10, 50);
    }
    spawnSun() {
        this.frameSinceLastSun++;
        if (this.frameSinceLastSun > 60) {
            this.sun = new Sun();
            this.frameSinceLastSun = 0;
        }
    }
}