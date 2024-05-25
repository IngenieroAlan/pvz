class Plant {
  constructor(imgPlant, x, y) {
    this.x = x;
    this.y = y;
    this.imgPlant = imgPlant;
    //shoot projectiles
    /*setInterval(() => {
            projectiles.push(new Projectile(this.x, this.y));
        }, 1000);*/
    this.health = 100;
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
      this.direction = 1; // 1 para avanzar, -1 para retroceder
    }
  
    display() {
      image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
    }
  
    changeFrame() {
      this.currentFrame += this.direction;
  
      // Si llega al último cuadro, cambia la dirección a -1 (retroceder)
      if (this.currentFrame === this.frames.length - 1) {
        this.direction = -1;
      }
      // Si llega al primer cuadro, cambia la dirección a 1 (avanzar)
      else if (this.currentFrame === 0) {
        this.direction = 1;
      }
    }
  
    update() {
      this.display();
      if (frameCount % 10 === 0) { // Cambia cada 10 fotogramas
        this.changeFrame();
      }
    }
  }
  
  