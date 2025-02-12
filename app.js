let body = document.querySelector("body")
let level = document.querySelector("h3")
let playground = document.querySelector(".playground")
let boxes = document.querySelectorAll(".box")
let helpBtn = document.querySelector(".help")


let started = false;
let memArr = []
// memArr = ['box1', 'box3', 'box2' ...]
let userArr = []
let levelNum = 0

let num = 0;
let clicks = 0; // this will count the user clicks
let score = 0

playground.addEventListener('click', (event) => {
    if(started) {
        if(event.target.className == 'box') {
            userFlash(event.target)
            clicks++;
            // console.log(clicks);
            userArr.push(event.target.id) 
            checker()
            
        }
        
    }
    
})

function userFlash (box) {
    box.classList.add('userFlash');

    setTimeout(() => {
        box.classList.remove('userFlash')
    }, 200)
}

function checker() {
    // memArr  : [1,3,4,2]
    // userArr : [1] -- [1,3] -- [1,3,4] -- [1,3,4,2]
    // clicks = 1
    // num = 0
    if(userArr[clicks - 1] != memArr[clicks - 1]) {
        //we have lost the game
        level.innerText = `You have lost the game, Your score is ${score}`
        started = false;
        userArr = [];
        memArr = [];
        clicks = 0;
        num = 0;

        body.classList.add('gameOver')
        console.log(body.classList);
        
        setTimeout(() => {
            body.classList.remove('gameOver')
        }, 500)
        
        levelNum = 1
    }else {
        num++;
        // num == 1 -- 2 -- 3 -- 4
    }

    if (num == memArr.length && num != 0) {
        
        // user clicked all the boxes in correct manner
        score += 10;
        userArr = []
        clicks = 0;
        num = 0
        setTimeout(selectBox, 500)
    }
}

body.addEventListener('keydown', () => {
    if(started == false) {
        started = true;
        selectBox();
    }
})

function selectBox() {
    level.innerText = `Level ${levelNum}` // initailly -> 0
    levelNum++; // 0 -> 1
    
    let randVal = Math.floor((Math.random()*4)) // [0,4) | 0,1,2,3
    flashRand(randVal)

    memArr.push(boxes[randVal].id)
}

function flashRand(randVal) {
    boxes[randVal].classList.add('memFlash')

    setTimeout(() => {
        boxes[randVal].classList.remove('memFlash')
    },[250]) // 250ms
}

helpBtn.addEventListener('click', () => {
    let initText = level.innerText;

    level.innerText = `Memory array is : ${memArr}`

    setTimeout(() => {
        level.innerText = initText
    }, 2000)
})