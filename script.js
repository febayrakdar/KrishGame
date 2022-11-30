textBox = document.getElementById("regularText");
headingBox = document.getElementById("title")
image = document.getElementById("krish")
heart1 = document.getElementById("heart1")
heart2 = document.getElementById("heart2")
heart3 = document.getElementById("heart3")
form = document.getElementById("form");
// box = document.getElementById("box");
question = document.getElementById("question")
inputBox = document.getElementById("inputBox")
var determination = new Audio('./audio/determination.mp3')
inputBox.style.opacity = 0;
document.addEventListener("click", game)
var isRunning = false;
var theme = new Audio('./audio/trap.mp3');
var lives = 3;

async function showText(text) {
    textBox.innerHTML = "";
    isRunning = true;
    for (var i = 0; i <= text.length; i++) {
        await sleep(80);
        let letter = text.substring(i, i+1);
        textBox.innerHTML = textBox.innerHTML + letter;

        if(letter != " "){
            var narrate = new Audio('./audio/sans.mp3')
            narrate.play();
        }
    }
    isRunning = false;
}

async function fadeText(text, id) {
    let textbox = document.getElementById(id);
    textbox.style.opacity = 0;
    textbox.innerHTML = text;
    for (var i = 0; i<= 1; i+= 0.01)
    {
        await sleep(25);
        textbox.style.opacity = i;
    }
}


async function fadeImg(id) {
    let img = document.getElementById(id);
    img.style.opacity = 0;
    img.style.visibility = 'visible';
    for (var i = 0; i<= 1; i+= 0.01)
    {
        await sleep(25);
        img.style.opacity = i;
    }
}

async function unFadeImg(id) {
    let img = document.getElementById(id);
    img.style.opacity = 1;
    img.style.visibility = 'visible';
    for (var i = 1; i>= 0; i-= 0.01)
    {
        await sleep(25);
        img.style.opacity = i;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let stageOfGame = 0;
async function game()
{ 
    if(!isRunning)
    {
        switch(stageOfGame){
            case 0:
                fadeText("", "title")
                showText("Welcome to my classroom!")
                break;
            case 1: 
                showText("You are to answer a number of questions.")
                break;
            case 2:
                showText("...")
                break;
            case 3:
                showText("I'd recommend you get started");
                break;    
            case 4:
                textBox.innerHTML = "";
                qStart();
        }
        stageOfGame++;
    }
}

function qStart(){
    fadeImg('heart1');
    fadeImg('heart2');
    fadeImg('heart3');
    fadeImg('krish');
    // fadeImg('box');
    fadeImg("inputBox")
    theme.play();
    newQuestion();
    document.getElementById("form").style.visibility = "visible"
    }
var answer
function newQuestion()
{
    var num1 = parseInt(Math.random() * 30);
    var num2 = parseInt(Math.random() * 30);
    var operation = parseInt(Math.random() * 3);
    

    switch (operation){
        case 0:
            answer = num1+num2;
            question.innerHTML = num1 + " + " + num2;
            break;
        case 1:
            answer = num1 - num2;
            question.innerHTML = num1 + " - " + num2;
            break;
        case 2:
            answer = num1 * num2;
            question.innerHTML = num1 + " x " + num2;
            break;
        case 3: 
            answer = parseInt(num1 / num2);
            question.innerHTML = num1 + " / " + num2;
            break;
    }
}

async function checkAnswer()
{
    if (inputBox.value == answer)
    {
        newQuestion();
        inputBox.value = "";
    } else {
        if(lives == 3){
            unFadeImg("heart3")
            lives--;
        }
        else if(lives == 2){
            unFadeImg("heart2")
            lives--
        }
        else if(lives == 1){
            theme.pause();
            unFadeImg("krish")
            unFadeImg('form')
            unFadeImg('question')
            await unFadeImg("heart1")
            krish.remove();
            form.remove();
            question.remove();
            determination.play();
            fadeText('You lose please take this L', 'title')
            fadeText('L', 'L')

        }
    }
    return false;
}
fadeText("Krish's Classroom", "title")
