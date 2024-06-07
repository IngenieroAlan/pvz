// Clase padre
class Zombie {
  constructor(imgZombie, x, y, health, speed, biteSound) {
    this.imgZombie = imgZombie;
    this.biteSound = biteSound;
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.aux_speed = speed;
    this.w = 55;
    this.h = 80;
    this.r = 10;
    this.frames = [
      imgZombie.get(0, 0, 45, 55),
      imgZombie.get(45, 0, 35, 55),
      imgZombie.get(70, 0, 45, 55),
      imgZombie.get(110, 0, 45, 55),
    ];
    this.currentFrame = 0;
    this.direction = 1;
    this.damage = 10;
  }

  display() {
    image(this.frames[this.currentFrame], this.x, this.y - 20, this.w, this.h);
  }

  changeFrame() {
    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
  }

  update() {
    this.x -= this.speed;
    if (this.currentFrame === 0) {
      this.speed = 0;
    } else {
      this.speed = this.aux_speed;
    }


    if (frameCount % 30 === 0) this.changeFrame();
    this.display();
    this.hitsPlant();
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      zombies.splice(zombies.indexOf(this), 1);
      if(gameController.lvl>1){this.dropBuff();}
    }
  }
  dropBuff() {
    if (random(1) < 0.1) { // 10% de probabilidad
      let buffTypes = ["ExtraHealthBuff", "FasterShootingBuff", "ExtraDamageBuff"];
      let randomBuff = random(buffTypes);
      let newBuff;
      // Asume que tienes las imágenes de los buffs ya cargadas
      switch (randomBuff) {
        case "ExtraHealthBuff":
          newBuff = new ExtraHealthBuff(extraHealthBuffImage,this.x,this.y);
          break;
        case "FasterShootingBuff":
          newBuff = new FasterShootingBuff(fasterShootingBuffImage,this.x,this.y);
          break;
        case "ExtraDamageBuff":
          newBuff = new ExtraDamageBuff(extraDamageBuffImage,this.x,this.y);
          break;
      }
      
      gameController.addBuff(newBuff);
    }
  }

  hitsPlant() {
    let hits = false;
    for (let i = 0; i < plants.length; i++) {
      if (
        this.x < plants[i].x + plants[i].w &&
        this.x + this.w > plants[i].x &&
        this.y < plants[i].y + plants[i].h &&
        this.y + this.h > plants[i].y
      ) {
        hits = true;
        if (frameCount % 60 === 0) {
          setTimeout(() => {
            plants[i].takeDamage(this.damage);
            this.biteSound.play();
            // animation frames
          }, 1000);
        }
      }
    }
    if (hits) {
      this.speed = 0;
    }
  }



}
class DefaultZombie extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 100, .2, biteSound);
  }
}
class ConeHeadZombie extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 290, .2, biteSound);
    this.frames = [
      imgZombie.get(0, 0, 45, 55),
      imgZombie.get(45, 0, 35, 55),
      imgZombie.get(70, 0, 45, 55),
      imgZombie.get(110, 0, 45, 55),
    ];
  }
}
class BucketHeadZombie extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 650, .2, biteSound);
    this.frames = [
      imgZombie.get(0, 0, 45, 55),
      imgZombie.get(45, 0, 45, 55),
      imgZombie.get(80, 0, 45, 55),
      imgZombie.get(118, 0, 45, 55),
    ];
  }
}

//zombiestein 1500 health, smash plants, needs 3 shots to kill nut
class Zombiestein extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 1500, .1, biteSound);
    this.frames = [
      imgZombie.get(100, 0, 45, 67),
      imgZombie.get(150, 0, 45, 67),
      imgZombie.get(200, 0, 45, 67),
      imgZombie.get(250, 0, 45, 67),
    ];
    this.damage = 100;
    this.health = 1500;
    this.w = 60;
    this.h = 100;
  }

  hitsPlant() {
    let hits = false;
    for (let i = 0; i < plants.length; i++) {
      if (
        this.x < plants[i].x + plants[i].w &&
        this.x + this.w > plants[i].x &&
        this.y < plants[i].y + plants[i].h &&
        this.y + this.h > plants[i].y
      ) {
        hits = true;
        if (frameCount % 60 === 0) {
          setTimeout(() => {
            plants[i].takeDamage(this.damage);
            this.biteSound.play();
            // animation frames
          }, 2000);
        }
      }
    }
    if (hits) {
      this.speed = 0;
    }
  }
}