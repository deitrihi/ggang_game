const key = {
    keyDown: {},
    keyValue: {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        x: "attack",
        X: "attack",
    },
};
const bulletComProp = {
    launch: false,
    arr: [],
};
const gameBackground = {
    gameBox: document.querySelector(".game"),
};
const gameProp = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
};
const renderGame = () => {
    hero.keyMotion();
    setGameBackground();
    bulletComProp.arr.forEach((arr, i) => {
        arr.moveBullet();
    });
    window.requestAnimationFrame(renderGame);
};
const setGameBackground = () => {
    let parallaxValue = Math.min(
        0,
        (hero.movex - gameProp.screenWidth / 3) * -1
    );
    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

const windowEvent = () => {
    // window에 이벤트를 추가 하고 관리하는 부분
    window.addEventListener("keydown", (e) => {
        // 키가 눌렸을 때 발생하는 이벤트
        key.keyDown[key.keyValue[e.key]] = true;
    });
    window.addEventListener("keyup", (e) => {
        // 키가 때어졌을 떄 발생하는 이벤트
        key.keyDown[key.keyValue[e.key]] = false;
    });
    window.addEventListener("resize", () => {
        gameProp.screenWidth = window.innerWidth;
        gameProp.screenHeight = window.innerHeight;
    });
};
const loadImg = () => {
    const preLoadImgSrc = [
        "../../lib/images/ninja_attack.png",
        "../../lib/images/ninja_run.png",
    ];
    preLoadImgSrc.forEach((arr) => {
        const img = new Image();
        img.src = arr;
    });
};
let hero;
const init = () => {
    // 초기화
    hero = new Hero(".hero");
    loadImg();
    windowEvent();
    renderGame();
    console.log(hero.position());
};

window.onload = () => {
    init();
};
