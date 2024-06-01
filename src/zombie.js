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
    if (frameCount % 10 === 0) {
      this.changeFrame();
    }
    this.display();
    this.hitsPlant();
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      zombies.splice(zombies.indexOf(this), 1);
      gameController.points += 100;
    }
  }

  hitsPlant() {
    for (let i = 0; i < plants.length; i++) {
      if (
        this.x < plants[i].x + plants[i].w &&
        this.x + this.w > plants[i].x &&
        this.y < plants[i].y + plants[i].h &&
        this.y + this.h > plants[i].y
      ) {
        this.speed = 0;
        if (frameCount % 60 === 0) {
          this.biteSound.play();
          plants[i].takeDamage(this.damage);
        }
      } else {
        this.speed = this.aux_speed;
      }
    }
  }



}
class DefaultZombie extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 100, .5, biteSound);
  }
}
class ConeHeadZombie extends Zombie {
  constructor(imgZombie, x, y, biteSound) {
    super(imgZombie, x, y, 200, .5, biteSound);
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
    super(imgZombie, x, y, 300, 0.25, biteSound);
    this.frames = [
      imgZombie.get(0, 0, 45, 55),
      imgZombie.get(45, 0, 45, 55),
      imgZombie.get(80, 0, 45, 55),
      imgZombie.get(118, 0, 45, 55),
    ];
  }
}
