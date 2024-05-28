// Clase padre
class Zombie {
    constructor(imgZombie, x, y, health, speed) {
      this.imgZombie = imgZombie;
      this.x = x;
      this.y = y;
      this.health = health;
      this.speed = speed;
      this.w = 55;
      this.h = 80;
      this.frames = [
        imgZombie.get(0, 0, 45, 55),
        imgZombie.get(45, 0, 35, 55),
        imgZombie.get(70, 0, 45, 55),
        imgZombie.get(110, 0, 45, 55),
      ];
      this.currentFrame = 0;
      this.direction = 1;
    }
  
    display() {
      image(this.frames[this.currentFrame], this.x, this.y, this.w, this.h);
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
    }
  
    takeDamage(damage) {
      this.health -= damage;
      if (this.health <= 0) {
        // Todo: Eliminar zombie
      }
    }
  }
  class DefaultZombie extends Zombie {
    constructor(imgZombie, x, y) {
      super(imgZombie, x, y, 100, .5);
    }
  }
  class ConeHeadZombie extends Zombie {
    constructor(imgZombie, x, y) {
      super(imgZombie, x, y, 200, .5);
      this.frames = [
        imgZombie.get(0, 0, 45, 55),
        imgZombie.get(45, 0, 35, 55),
        imgZombie.get(70, 0, 45, 55),
        imgZombie.get(110, 0, 45, 55),
      ];
    }
  }
  class BucketHeadZombie extends Zombie {
    constructor(imgZombie, x, y) {
      super(imgZombie, x, y, 300, 0.25);
      this.frames = [
        imgZombie.get(0, 0, 45, 55),
        imgZombie.get(45, 0, 45, 55),
        imgZombie.get(90, 0, 45, 55),
        imgZombie.get(118, 0, 45, 55),
      ];
    }
  }
  