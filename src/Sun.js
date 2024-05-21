class Sun {
    constructor(sprite) {
        this.sprite = sprite;
    }
    render() {
        image(this.sprite, 0, 0, width, height, 0, 0, this.sprite.width, this.sprite.height, COVER);
    }
}