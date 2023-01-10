export default class Enemy {
    constructor(x, y) {

        this.img = document.getElementById("enemy")
        // 처음 좌표
        this.x = x || 300;
        this.y = y || 100;

        // this.vx = 0;
        // this.vy = 0;

        // this.dx = 0;
        // this.dy = 0;

    }
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            100,
            100
        )
    }
}