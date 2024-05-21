class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //shoot projectiles
        setInterval(() => {
            projectiles.push(new Projectile(this.x, this.y));
        }, 1000);

        this.health = 100;
    }

    update() {
        // Optionally add plant logic here
    }

    display() {
        fill(0, 255, 0);
        rect(this.x, this.y, 20, 20);
    }
}

// Projectile class
class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5;
        this.speed = 5;
    }

    update() {
        this.x += this.speed;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.r * 2);
    }

    offscreen() {
        return this.x > width;
    }

    hits(zombie) {
        let d = dist(this.x, this.y, zombie.x, zombie.y);
        return d < this.r + zombie.r;
    }
}