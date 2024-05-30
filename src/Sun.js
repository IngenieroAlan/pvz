class Sun {
    constructor(sprite, x, y) {
      this.sprite = sprite;
      this.x = x;
      this.y = y-50;
      this.targetY = y-10;
      this.speed = 1;
    }
  
    render() {
        //rect(this.x, this.y, 30, 30);
        image(this.sprite, this.x, this.y, 40, 40);
    }
  
    update() {
      if (this.y < this.targetY) {
        this.y += this.speed;
      }
      this.render();
    }
  }
  