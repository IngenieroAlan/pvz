class Buff {
    constructor(imgBuff, x, y) {
      this.imgBuff = imgBuff;
      this.x = x;
      this.y = y;
      this.w = 50;
      this.h = 50;
    }
  
    render() {
      image(this.imgBuff, this.x, this.y, this.w, this.h);
    }
  
    applyBuff(plant) {
      // Esta función será implementada en las subclases
    }
  
    isCollected(mx, my) {
      return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }
  }
  
  class ExtraDamageBuff extends Buff {
    constructor(imgBuff, x, y) {
      super(imgBuff, x, y);
    }
  
    applyBuff(plant) {
      if (plant instanceof PeaShooter || plant instanceof Repeater) {
        plant.projectiles.forEach(projectile => projectile.damage += 10);
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
    }
  
    applyBuff(plant) {
      if (plant instanceof PeaShooter || plant instanceof Repeater) {
        clearInterval(plant.shootInterval);
        plant.shootInterval = setInterval(() => plant.shootProjectile(), 500); // Dispara dos veces más rápido
      }
    }
  }
  