// import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';

let colorBox = document.getElementById('color-box')
let optionsContainer = document.getElementById("options-container");
let scoreText = document.getElementById('score-text')
const resetGameButton = document.getElementById('reset-game')
const gameStatusText = document.getElementById('gameStatus')
let modalContainer = document.querySelector('.modal-container')
const timer = document.getElementById('timer')
const nextButton = document.getElementById('next-button')


let score = 0
let gameActive = true
const generateRandomColors = () => {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // return `rgb(${r}, ${g}, ${b})`;

    const hex = [r, g, b].map((color) => color.toString(16).padStart(2, '0')).join('')

    return `#${hex}`
}

const generateColor = (num) => {
    let colors = []

    for (let i = 0; i < num; i++) {
        colors[i] = generateRandomColors()
    }

    return colors
}

const setTimer = (time) => {
    let interval = setInterval(() => {
        console.log(time)

        timer.innerText = time--
        if (time <= 0) {
            clearInterval(interval)

        }
    }, 1000);

}
const resetGameStatus = () => {
    gameStatusText.classList.remove('correct-animation', 'wrong-animation', 'message-animate');
    gameStatusText.innerText = '';
    gameStatusText.style.opacity = '0';
    gameStatusText.style.transform = 'translateY(-20px)';
}

const startGame = () => {
    let time = 15
    // score = 0
    scoreText.textContent = score
    gameStatusText.classList.remove('correct-animation', 'wrong-animation', 'message-animate');

    // setTimer(time)
    gameActive = true
    resetGameStatus()
    optionsContainer.innerHTML = ""; // Clear previous options

    gameStatusText.innerText = ``


    // correctColor = generateRandomColors();
    // console.log(correctColor);

    let colors = generateColor(6)
    // console.log(colors)

    const random = Math.floor(Math.random() * 6)
    const targetColor = colors[random]

    colorBox.style.backgroundColor = targetColor

    if (time <= 0) {
        gameActive = false;

    }

    colors.forEach((color) => {
        let button = document.createElement('button')
        button.style.backgroundColor = color
        button.setAttribute('data-testid', 'colorOption')
        optionsContainer.appendChild(button)


        button.addEventListener('click', () => {
            handleButtonClick(button, targetColor, color)

        })

    })

}

const handleButtonClick = (button, targetColor, selectedColor) => {
    if (!gameActive) return

    button.style.border = '2px solid black'
    checkGuessColor(targetColor, selectedColor)

}

const checkGuessColor = (selectedColor, targetColor) => {

    gameStatusText.style.display = 'none'; // Temporarily hide to ensure reset
    gameStatusText.classList.remove('correct-animation', 'wrong-animation', 'message-animate');
    gameStatusText.style.opacity = '0';
    gameStatusText.style.transform = 'translateY(-20px)';

    // Force reflow
    void gameStatusText.offsetWidth;

    // Make visible again
    gameStatusText.style.display = 'block';
    // gameStatusText.classList.remove('correct-animation', 'wrong-animation', 'message-animate');
    gameStatusText.classList.add('message-animate');

    // return selectedColor === targetColor
    if (selectedColor == targetColor) {
        score += 1

        // gameStatusText.style.animation = 'fadeIn 5s infinite;'
        // gameStatusText.style.color = 'green'
        gameStatusText.innerText += `You've got that correct`
        gameStatusText.style.color = '#4CAF50';
        gameStatusText.classList.add('correct-animation');

        // setTimeout(() => {

        //     startGame()
        // }, 3000);
        scoreText.textContent = score

    } else {
        modalContainer.style.display = 'flex'

        gameStatusText.innerText = `Oops!!, You've gotten it wrong`
        gameStatusText.style.color = 'red'
        gameStatusText.classList.add('wrong-animation');

        gameActive = false
    }

}

resetGameButton.addEventListener("click", () => {
    modalContainer.style.display = 'none'
    score = 0
    startGame()
}
)

nextButton.addEventListener('click', startGame)
startGame()
// colorBox.style.backgroundColor = targetColor;
