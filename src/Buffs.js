class Buff {
  constructor(image, x, y, type) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.type = type;
      this.collected = false;
      this.spawnTime = millis();
  }

  display() {
      if (!this.collected && (millis() - this.spawnTime) < 5000) {
          image(this.image, this.x, this.y);
      }
  }

  isCollected(mouseX, mouseY) {
      if (!this.collected && (millis() - this.spawnTime) < 5000) {
          if (mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 50) {
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
  constructor(imgBuff, x, y) {
    super(imgBuff, x, y);
  }
  render(){
    image(this.imgBuff.get(0,0,50,50), this.x, this.y, this.w, this.h);
  }

  applyBuff(plant) {
    if (plant instanceof PeaShooter || plant instanceof Repeater) {
      plant.projectiles.forEach((projectile) => (projectile.damage += 25));
    }
  }
}

class ExtraHealthBuff extends Buff {
  constructor(imgBuff, x, y) {
    super(imgBuff, x, y);
  }

  applyBuff(plant) {
    plant.health += 50;
  }
}

class FasterShootingBuff extends Buff {
  constructor(imgBuff, x, y) {
    super(imgBuff, x, y);
    this.speedPercentage = 1.15;
  }

  applyBuff(plant) {
    if (plant instanceof PeaShooter || plant instanceof Repeater) {
      clearInterval(plant.shootInterval);
      plant.shootInterval = setInterval(
        () => plant.shootProjectile(),
        plant.timeInterval * this.speedPercentage
      ); // Dispara dos veces más rápido
    }
  }
}
