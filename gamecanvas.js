
import Boy from'/game2/boy.js'
import Background from'/game2/background.js'
import Enemy from'/game2/enemy.js'



//canvas생성자


export default class GameCanvas {
    constructor() {
        this.dom = document.querySelector(".game-canvas")
        /* 집단지성*/
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.dom.getContext("2d")
        this.boy = new Boy(100, 100);
        this.enemy = new Enemy(300,100);

        this.dom.focus();//키보드로 인식

        this.bg = new Background();
        this.gameover = false;
        // 일시정지
        this.pause = false;
        this.boy.speed++;
        //함수를 대입하는것과 호출하는것은 다르다.
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓대입↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        this.dom.onclick = this.clickHandler.bind(this) //callback ==bind(this) 위임해놓고 나중에 실행한다.
        this.dom.onkeydown = this.keyDownHandler.bind(this)
        this.dom.onkeyup = this.keyUpHandler.bind(this)
    }

    run() {
        // 일시정지
        if (this.pause)
            return;
        this.update()
        this.draw()


        // window.setTimeout(this.run.bind(this),1000)

        window.setTimeout(() => {
            this.run()
        },17
        )



        // window.setInterval
    }
    update() {
        this.boy.update();//상태바뀌고
    }
    draw() {
        this.bg.draw(this.ctx);
        this.enemy.draw(this.ctx);
        this.boy.draw(this.ctx)//다시그리고
    }

    pause() {
        this.pause = true;
    }
    clickHandler(e) {
        // this.pause = true;
        // this.boy.move(2) 키보드
        this.boy.moveTo(e.x, e.y);
        // 겹치는 화면 해결방법 
        // 2가지
        // this.boy.draw(this.ctx)
    }
    keyDownHandler(e){
        switch(e.key){
            case"ArrowUp":
            this.boy.move(1);
            break;
            case"ArrowLeft":
            this.boy.move(4);
            break;
            case"ArrowRight":
            this.boy.move(2);
            break;
            case"ArrowDown":
            this.boy.move(3);
            break;
        }
        
    }
    keyUpHandler(e){
        switch(e.key){
            case"ArrowUp":
            this.boy.moveStop(1);
            break;
            case"ArrowLeft":
            this.boy.moveStop(4);
            break;
            case"ArrowRight":
            this.boy.moveStop(2);
            break;
            case"ArrowDown":
            this.boy.moveStop(3);
            break;
        }
    }

}


// export default GameCanvas;