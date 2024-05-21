// Zombie class
class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 20;
        this.speed = 1;
    }

    update() {
        this.x -= this.speed;
    }

    display() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.r, this.r);
    }

    offscreen() {
        return this.x < -this.r;
    }
}