class Plant {
  constructor(imgPlant, x, y) {
    this.x = x;
    this.y = y;
    this.imgPlant = imgPlant;
    this.health = 100;
  }
}
class Sunflower extends Plant {
    constructor(imgPlant, x, y) {
    super(imgPlant, x, y);
    this.w = 50;
    this.h = 50;
    this.frames = [
      imgPlant.get(0, 0, 33.2, 32.5),
      imgPlant.get(33.2, 0, 33.2, 32.5),
      imgPlant.get(66.4, 0, 33.2, 32.5),
      imgPlant.get(99.6, 0, 33.2, 32.5),
    ];
    this.currentFrame = 0;
    this.direction = 1;
  }

  display() {
    image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
  }

  changeFrame() {
    this.currentFrame += this.direction;
    if (this.currentFrame === this.frames.length - 1) {
      this.direction = -1;
    } else if (this.currentFrame === 0) {
        this.direction = 1;
    }
}

update() {
    this.display();
    if (frameCount % 10 === 0) {
        this.changeFrame();
    }
}
}

class PeaShooter extends Plant {
    constructor(imgPlant, x, y, imgProjectile) {
      super(imgPlant, x, y);
      this.w = 50;
      this.h = 50;
      this.frames = [
        imgPlant.get(0, 0, 30.25, 31.5),
        imgPlant.get(30.25, 0, 30.25, 31.5),
        imgPlant.get(60.5, 0, 30.25, 31.5),
        imgPlant.get(90.75, 0, 30.25, 31.5),
        imgPlant.get(121, 0, 30.25, 31.5),
        imgPlant.get(151.25, 0, 30.25, 31.5),
        imgPlant.get(181.5, 0, 30.25, 31.5),
        imgPlant.get(211.75, 0, 30.25, 31.5),
      ];
      this.currentFrame = 0;
      this.direction = 1;
      this.imgProjectile = imgProjectile.get(4.5, 69, 29.5, 28.9);
      this.projectiles = [];
      this.shootInterval = setInterval(() => this.shootProjectile(), 1000);
    }
  
    display() {
      image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
      this.projectiles.forEach((projectile) => {
        projectile.display();
      });
    }
  
    shootProjectile() {
      this.projectiles.push(new Projectile(this.x, this.y, this.imgProjectile));
    }
  
    changeFrame() {
      this.currentFrame += this.direction;
      if (this.currentFrame === this.frames.length - 1) {
        this.direction = -1;
      } else if (this.currentFrame === 0) {
        this.direction = 1;
      }
    }
  
    update() {
      this.display();
      if (frameCount % 10 === 0) {
        this.changeFrame();
      }
      this.projectiles.forEach((projectile) => projectile.update());
      this.projectiles = this.projectiles.filter((projectile) => !projectile.offscreen());
    }
  
    remove() {
      clearInterval(this.shootInterval);
    }
  }
  
  class Nut extends Plant {
    constructor(imgPlant, x, y) {
      super(imgPlant, x, y);
      this.w = 50;
      this.h = 50;
      this.frames = [
        imgPlant.get(0, 0, 25, 31.5),
        imgPlant.get(25, 0, 25, 31.5), 
        imgPlant.get(50, 0, 25, 31.5), 
        imgPlant.get(75, 0, 25, 31.5),
        imgPlant.get(100, 0, 25, 31.5),
      ];
      this.currentFrame = 0;
      this.direction = 1;
      this.health = 300;
    }
  
    display() {
      image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
    }
  
    changeFrame() {
      this.currentFrame += this.direction;
      if (this.currentFrame === this.frames.length - 1) {
        this.direction = -1;
      } else if (this.currentFrame === 0) {
        this.direction = 1;
      }
    }
  
    update() {
      this.display();
      if (frameCount % 30 === 0) {
        this.changeFrame();
      }
    }
  }  

// Projectile class
class Projectile {
    constructor(x, y, imgProjectile) {
      this.x = x;
      this.y = y;
      this.r = 15;
      this.speed = 5;
      this.imgProjectile = imgProjectile;
    }
  
    update() {
      this.x += this.speed;
    }
  
    display() {
      image(this.imgProjectile, this.x, this.y, this.r * 2, this.r * 2);
    }
  
    offscreen() {
      return this.x > width;
    }
  
    hits(zombie) {
      let d = dist(this.x, this.y, zombie.x, zombie.y);
      return d < this.r + zombie.r;
    }
  }
  