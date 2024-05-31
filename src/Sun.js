class Sun {
  constructor(sprite, x, y, targetY = y-10) {
    this.sprite = sprite;
    this.x = x;
    this.y = y - 50;
    this.targetY = targetY;
    this.speed = 1;
  }

  render() {
      image(this.sprite, this.x, this.y, 40, 40);
  }

  update() {
      if (this.y < this.targetY) {
          this.y += this.speed;
      }
      this.render();
  }

  isClicked(mx, my) {
      return mx > this.x && mx < this.x + 40 && my > this.y && my < this.y + 40;
  }
}
