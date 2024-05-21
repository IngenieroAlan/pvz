class GameController {
    constructor(bg, seeds, points) {
        this.bg = bg;
        this.seeds = seeds;
        this.points = points;
        this.sun = [];
        this.frameSinceLastSun = 0;
    }
    renderHud() {
        image(bg, 0, 0, width, height, 0, 0, this.bg.width, this.bg.height, COVER);
        image(seeds, 160, 0, 300, 100);
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