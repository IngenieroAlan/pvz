class Buff {
  constructor(image, x, y, type) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.w = 40;
      this.h = 40;
      this.type = type;
      this.collected = false;
      this.spawnTime = millis();
  }

  update() {
      if (!this.collected && (millis() - this.spawnTime) < 5000) {
          this.render();
      }
  }
  render(){
    image(this.image, this.x, this.y, this.w, this.h);
  }
  isCollected(mouseX, mouseY) {
      if (!this.collected && (millis() - this.spawnTime) < 5000) {
          if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
              this.collected = true;
              return true;
          }
      }
      return false;
  }

  isExpired() {
      return (millis() - this.spawnTime) >= 5000;
  }
}
class ExtraDamageBuff extends Buff {
  constructor(image, x, y) {
    super(image, x, y, "ExtraDamage");
    this.image = extraDamageBuffImage;
    this.w = 50;
    this.h = 55;
  }
  applyBuff(plant) {
    if (plant instanceof PeaShooter || plant instanceof Repeater) {
      plant.projectiles.forEach((projectile) => (projectile.damage += 25));
    }
  }
}

class ExtraHealthBuff extends Buff {
  constructor(image, x, y) {
    super(image, x, y, "ExtraHealth");
    this.image = extraHealthBuffImage;
  }
  applyBuff(plant) {
    plant.health += 50;
  }
}

class FasterShootingBuff extends Buff {
  constructor(image, x, y) {
    super(image, x, y, "FasterShooting");
    this.speedPercentage = 1.15;
    this.image = fasterShootingBuffImage;
  }

  applyBuff(plant) {
    if (plant instanceof PeaShooter || plant instanceof Repeater) {
      clearInterval(plant.shootInterval);
      plant.shootInterval = setInterval(
        () => plant.shootProjectile(),
        plant.timeInterval / this.speedPercentage
      );
    }
  }
}
