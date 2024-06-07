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
  constructor(imgPlant, x, y, sunSprite, sunSound) {
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
    this.sunSprite = sunSprite;
    this.sunSound = sunSound;
    this.suns = [];
    this.lastSunTime = millis();
    this.health = 30;
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

  generateSun() {
    let currentTime = millis();
    if (currentTime - this.lastSunTime >= 5000) {
      this.suns.push(new Sun(this.sunSprite, this.x + 10, this.y + this.h));
      this.lastSunTime = currentTime;
    }
  }

  update() {
    this.display();
    this.generateSun();
    if (frameCount % 10 === 0) {
      this.changeFrame();
    }
    this.suns.forEach(sun => sun.update());
  }
  checkSunClicked(mx, my, GameController) {
    for (let i = this.suns.length - 1; i >= 0; i--) {
      if (this.suns[i].isClicked(mx, my)) {
        this.suns.splice(i, 1);
        this.sunSound.play();
        GameController.points += 25;
        break;
      }
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
    this.health = 30;
    //shots every 1.5 seconds
    this.timeInterval = 1500;
    this.shootInterval = setInterval(() => this.shootProjectile(), this.timeInterval);
  }

  display() {
    image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
    this.projectiles.forEach((projectile) => {
      projectile.display();
    });
  }

  shootProjectile() {
    this.projectiles.push(new Projectile(this.x+this.w-15, this.y, this.imgProjectile));
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
      (projectile) => !projectile.offscreen() && !projectile.hits()
    );
  }

  remove() {
    clearInterval(this.shootInterval);
  }
}
class Repeater extends PeaShooter {
  constructor(imgPlant, x, y, imgProjectile) {
    super(imgPlant, x, y, imgProjectile);
    this.health = 50;
    this.frames = [
      imgPlant.get(0, 0, 30.25, 33.5),
      imgPlant.get(37, 0, 30.25, 33.5),
      imgPlant.get(74, 0, 30.25, 33.5),
      imgPlant.get(107, 0, 30.25, 33.5),
      imgPlant.get(140, 0, 30.25, 33.5),
    ];
    clearInterval(this.shootInterval); // Limpiamos el intervalo original de PeaShooter
    this.timeInterval=1000;
    this.shootInterval = setInterval(() => {
      this.shootProjectile();
      setTimeout(() => {
        this.shootProjectile();
      }, 100);
    }, this.timeInterval);
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
    this.health = 400;
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
  constructor(imgPlant, x, y, explotionSound) {
    super(imgPlant, x, y);
    this.w = 40;
    this.h = 45;
    this.health = 20;
    this.frameInactive = imgPlant.get(0, 0, 17, 25);
    this.framesActive = [
      imgPlant.get(18, 0, 20.5, 25),
      imgPlant.get(38.5, 0, 29, 27.5),
      imgPlant.get(67.5, 0, 28.5, 28),
      imgPlant.get(95.5, 0, 28.5, 28), // x,y, w, h
      imgPlant.get(125, 0, 26, 25),
      imgPlant.get(152, 0, 28.5, 28),
      imgPlant.get(180, 0, 28.5, 28),
    ];
    this.explotionSound = explotionSound;
    this.explosionFrames = [
      imgPlant.get(0, 40, 52, 60),//LISTO
      imgPlant.get(52, 40, 52, 60),//LISTO
      imgPlant.get(104, 25, 52, 60),//LISTO
      imgPlant.get(162, 25, 65, 70), // x,y, w, h //listo
      imgPlant.get(232, 25, 68, 70),// listo aumentar sizes
      imgPlant.get(300, 25, 74, 70),// listo aumentar sizes
      imgPlant.get(373, 25, 60, 60),// listo ajustar sizes
      imgPlant.get(447, 25, 72, 60),// listo ajustar sizes
    ];
    this.currentFrame = 0;
    this.direction = 1;
    this.activated = false;
    this.exploded = false;
    this.explosionFrameIndex = 0;
    this.plantTime = millis();
    setTimeout(() => {
      this.activated = true;
      this.currentFrame = 0;
      this.direction = 1;
    }, 15000);
  }

  display() {
    if (this.exploded) {
      switch (this.explosionFrameIndex) {
        case 0, 1, 2:
          image(
            this.explosionFrames[this.explosionFrameIndex],
            this.x - 10,
            this.y - 10,
            this.w + 40,
            this.h + 30
          );
          break;
        case 3:
          image(this.explosionFrames[this.explosionFrameIndex], this.x - 25, this.y - 30, this.w + 70, this.h + 45);
          break;
        case 4:
          image(this.explosionFrames[this.explosionFrameIndex], this.x - 25, this.y - 33, this.w + 80, this.h + 46);
          break;
        case 5:
          image(this.explosionFrames[this.explosionFrameIndex], this.x - 30, this.y - 33, this.w + 90, this.h + 46);
          break;
        case 6:
          image(this.explosionFrames[this.explosionFrameIndex], this.x - 32, this.y - 30, this.w + 70, this.h + 30);
          break;
        case 7:
          image(this.explosionFrames[this.explosionFrameIndex], this.x - 35, this.y - 33, this.w + 90, this.h + 35);
          break;
      }

    } else if (this.activated) {
      image(
        this.framesActive[this.currentFrame],
        this.x,
        this.y,
        this.w,
        this.h
      );
    } else {
      image(this.frameInactive, this.x, this.y, this.w, this.h);
    }
  }

  changeFrame() {
    if (this.exploded) {
      this.explosionFrameIndex++;
      if (this.explosionFrameIndex >= this.explosionFrames.length) {
        this.remove();
      }
    } else {
      this.currentFrame += this.direction;
      if (this.currentFrame === this.framesActive.length - 1) {
        this.direction = -1;
      } else if (this.currentFrame === 0) {
        this.direction = 1;
      }
    }
  }

  update() {
    this.display();
    if (this.exploded) {
      if (frameCount % 5 === 0) {
        this.changeFrame();
      }
    } else {
      if (this.activated && frameCount % 30 === 0) {
        this.changeFrame();
      }
      this.checkCollisionWithZombies();
    }
  }

  checkCollisionWithZombies() {
    if (!this.activated) return;
    for (let i = 0; i < zombies.length; i++) {
      let z = zombies[i];
      if (
        this.x < z.x + z.w &&
        this.x + this.w > z.x &&
        this.y < z.y + z.h &&
        this.y + this.h > z.y
      ) {
        this.explode(z);
        break;
      }
    }
  }

  explode(zombie) {
    this.exploded = true;
    this.explosionFrameIndex = 0;
    zombie.takeDamage(200);
    this.explotionSound.play();
  }

  remove() {
    let index = plants.indexOf(this);
    if (index > -1) {
      plants.splice(index, 1);
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

  hits() {
    for (let i = 0; i < zombies.length; i++) {
      if (
        this.x < zombies[i].x + zombies[i].w &&
        this.x + this.r > zombies[i].x &&
        this.y < zombies[i].y + zombies[i].h &&
        this.y + this.r > zombies[i].y
      ) {
        zombies[i].takeDamage(this.damage);
        return true;
      }
    }
    return false;
  }
}
