export default class Boy {
  #speed;
  constructor(x, y) {

    this.x = x || 100;
    this.y = y || 100;

    this.vx = 0;
    this.vy = 0;


    this.dx = 0;
    this.dy = 0;

    this.#speed =3;
    //이미지를 그리기위한 변수
    this.walkDelay = 15;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.ix = 1;
    this.iy = 2;
    //이건 이제 우리가 손대는것이 아님.
    this.sw = 106;
    this.sh = 148.25;
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;
    this.img = document.getElementById("boy")
  }
  set speed(value){
    this.#speed = value;
  }
  get speed(){
    return this.#speed;
  }

  draw(ctx) {
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;
    // // console.log(this) 여기까지는 boy
    // var img = new Image();
    // // console.log(this) 여기부터는 image 객체가 생성.그래서 image
    // img.src = "/image/boy.png";
    // img.onload = function () {
    // }.bind(this);
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh + 10, this.x - this.sw / 2, this.y - this.sh / 2, this.sw, this.sh)
  }
  //자가 호출하는게 아니다.
  //초당60번의 영사기가 계속 동작하고있다.
  //gameThread
  update() {

    if ((this.dx - 1 < this.x &&/*and*/  this.x < this.dx + 1) ||/*or*/  (this.dy - 1 < this.y && this.y < this.dy + 1)) {
      this.vx = 0;
      this.vy = 0;
    }
    if (this.moveUp){
      this.y -= this.#speed;
      this.iy = 0;
    }
    if (this.moveDown){
      this.y += this.#speed;
      this.iy = 2;
    }
    if (this.moveLeft){
      this.x -= this.#speed;
      this.iy =3;
    }
    if (this.moveRight){
      this.x += this.#speed;
      this.iy =1;
    }
    // switch (this.dir) {
    //   case 1://북쪽
    //     this.y -= 1
    //     break
    //   case 2://동쪽
    //     this.x += 1
    //     break
    //   case 3://남쪽
    //     this.y += 1
    //     break
    //   case 4:// 서쪽
    //     this.x -= 1
    //     break
    // }
    // 백터가 0이면 반환
    // 이중 누르는게 하나라도 있으면
    if (!(this.moveLeft || this.moveRight || this.moveUp || this.moveDown|| false)) {
      if (this.vx == 0 && this.vy == 0)
        this.ix = 1;
      return;
    }
   

    this.x += this.vx;
    this.y += this.vy;

    // 걸음을 걷는효과
    this.walkDelay--;
    if (this.walkDelay == 0) {
      this.ix = this.ix == 2 ? 0 : 2;
      this.walkDelay = 15;
    }

    // 키보드이동--------------------------
  }//사용자가 호출하는게 아니다.
  //초당60번의 영사기가 계속 동작하고있다.
  //gameThread
  move(dir) {
    switch (dir) {
      case 1://북쪽
        this.moveUp = true;
        break
      case 3://남쪽
        this.moveDown = true;
        break
      case 2://동쪽
        this.moveRight = true;
        break
      case 4:// 서쪽
        this.moveLeft = true;
        break
    }
  }
  moveStop(dir) {
    switch (dir) {
      case 1://북쪽
        this.moveUp = false;
        break;
      case 3://남쪽
        this.moveDown = false;
        break;
      case 2://동쪽
        this.moveRight = false;
        break;
      case 4:// 서쪽
        this.moveLeft = false;
        break;
    }
  }
  moveTo(dx, dy) {
    let w = dx - this.x
    let h = dy - this.y
    let d = Math.sqrt(w * w + h * h)
    // 단위백터만큼 이동
    this.vx = w / d
    this.vy = h / d
    this.dx = dx
    this.dy = dy
  }


}

//    캡슐화란 : 