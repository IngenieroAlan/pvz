class Plant {
  constructor(imgPlant, x, y) {
    this.x = x;
    this.y = y;
    this.imgPlant = imgPlant;
    this.health = 100;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      plants.splice(plants.indexOf(this), 1);
    }
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
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.offscreen()
    );
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
      imgPlant.get(0, 0, 27.5, 31.5),
      imgPlant.get(27.5, 0, 27.5, 31.5),
      imgPlant.get(55, 0, 27.5, 31.5),
      imgPlant.get(82, 0, 27.5, 31.5),
      imgPlant.get(108, 0, 27.5, 31.5),
    ];
    this.fase2Frames = [
      imgPlant.get(0, 32.2, 27.5, 31.5),
      imgPlant.get(27.5, 32.2, 27.5, 31.5),
      imgPlant.get(55, 32.2, 27.5, 31.5),
      imgPlant.get(82, 32.2, 27.5, 31.5),
      imgPlant.get(108, 32.2, 27.5, 31.5),
    ];
    this.fase3Frames = [
      imgPlant.get(0, 63.5, 27.5, 30.8),
      imgPlant.get(27.5, 63.5, 27.5, 30.8),
      imgPlant.get(55, 63.5, 27.5, 30.8),
      imgPlant.get(82, 63.5, 27.5, 30.8),
      imgPlant.get(108, 63.5, 27.5, 30.8),
    ];
    this.currentFrame = 0;
    this.direction = 1;
    this.health = 100;
  }

  display() {
    if (this.health > 200) {
      image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
    }
    if (this.health > 100 && this.health <= 200) {
      image(this.fase2Frames[this.currentFrame], this.x, this.y, this.w, this.h);
    }
    if (this.health <= 100) {
      image(this.fase3Frames[this.currentFrame], this.x, this.y, this.w, this.h);
    }
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
    if (frameCount % 14 === 0) {
      this.changeFrame();
    }
  }
}
class PotatoMine extends Plant {
  constructor(imgPlant, x, y) {
    super(imgPlant, x, y);
    this.w = 40;
    this.h = 45;
    this.frameInactive = imgPlant.get(0, 0, 17, 25); // Un solo cuadro para el estado inactivo
    this.framesActive = [
      imgPlant.get(18, 0, 20.5, 25),
      imgPlant.get(38.5, 0, 29, 27.5),
      imgPlant.get(67.5, 0, 28.5, 28),
      imgPlant.get(95.5, 0, 28.5, 28), // x,y, w, h
      imgPlant.get(125, 0, 26, 25),
      imgPlant.get(152, 0, 28.5, 28),
      imgPlant.get(180, 0, 28.5, 28),
    ];
    this.currentFrame = 0;
    this.direction = 1;
    this.activated = true;
    this.plantTime = millis(); // Registra el tiempo en que se plantó
  }

  display() {
    if (this.activated) {
      image(this.framesActive[this.currentFrame], this.x, this.y, this.w, this.h);
      //image(this.framesActive[7], this.x, this.y, this.w, this.h);
    } else {
      image(this.frameInactive, this.x, this.y, this.w, this.h);
    }
  }

  changeFrame() {
    this.currentFrame += this.direction;
    if (this.currentFrame === this.framesActive.length - 1) {
      this.direction = -1;
    } else if (this.currentFrame === 0) {
      this.direction = 1;
    }
  }

  update() {
    if (!this.activated && millis() - this.plantTime >= 15000) { // 15 segundos en milisegundos
      this.activated = true;
      this.currentFrame = 0; // Reinicia la animación al cambiar a activo
      this.direction = 1;
    }
    this.display();
    if (this.activated && frameCount % 30 === 0) {
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
    this.damage = 10;
    this.imgProjectile = imgProjectile;
    projectiles.push(this);
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
    return (
      this.x + this.r > zombie.x &&
      this.x - this.r < zombie.x + zombie.w &&
      this.y + this.r > zombie.y &&
      this.y - this.r < zombie.y + zombie.h
    )
  }
}
