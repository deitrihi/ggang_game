class Hero {
    constructor(el) {
        this.el = document.querySelector(el);
        this.movex = 0;
        this.speed = 8;
        //console.log(this.el.getBoundingClientRect());
    }
    keyMotion() {
        //히어로의 움직을을 처리
        if (key.keyDown["left"]) {
            this.el.classList.add("run", "flip");
            this.movex = this.movex - this.speed;
            console.log(`left : ${this.position().left}`);
        } else if (key.keyDown["right"]) {
            this.el.classList.add("run");
            this.el.classList.remove("flip");
            this.movex = this.movex + this.speed;
            console.log(`right : ${this.position().right}`);
        }
        if (!key.keyDown["left"] && !key.keyDown["right"]) {
            this.el.classList.remove("run");
        }

        // 공격
        if (key.keyDown["attack"]) {
            if (!bulletComProp.launch) {
                this.el.classList.add("attack");
                bulletComProp.arr.push(new Bullet());

                bulletComProp.launch = true;
            }
        }
        if (!key.keyDown["attack"]) {
            this.el.classList.remove("attack");
            bulletComProp.launch = false;
        }

        this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
    }
    position() {
        return {
            left: this.el.getBoundingClientRect().left,
            right: this.el.getBoundingClientRect().right,
            top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom:
                gameProp.screenHeight -
                this.el.getBoundingClientRect().top -
                this.el.getBoundingClientRect().height,
        };
    }
    size() {
        return {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight,
        };
    }
}

class Bullet {
    constructor() {
        this.parentNode = document.querySelector(".game");
        this.el = document.createElement("div");
        this.el.className = "hero_bullet";
        this.x = 0;
        this.y = 0;

        this.speed = 30;
        this.distance = 0;
        this.init();
    }
    init() {
        this.x = hero.position().left + hero.size().width / 2;
        this.y = hero.position().bottom - hero.size().height / 2;
        this.distance = this.x;
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.parentNode.appendChild(this.el);
    }
    moveBullet() {
        this.distance += this.speed;
        this.el.style.transform = `translate(${this.distance}px, ${this.y}px)`;

        this.crashBullet();
    }
    position() {
        return {
            left: this.el.getBoundingClientRect().left,
            right: this.el.getBoundingClientRect().right,
            top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom:
                gameProp.screenHeight -
                this.el.getBoundingClientRect().top -
                this.el.getBoundingClientRect().height,
        };
    }
    crashBullet() {
        if (
            this.position().left > gameProp.screenWidth ||
            this.position().right < 0
        ) {
            this.el.remove();
        }
    }
}
