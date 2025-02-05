// import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';

let colorBox = document.getElementById('color-box')
let optionsContainer = document.getElementById("options-container");
let scoreText = document.getElementById('score-text')
const resetGameButton = document.getElementById('reset-game')
const gameStatusText = document.getElementById('gameStatus')

let score = 0

const generateRandomColors = () => {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // return `rgb(${r}, ${g}, ${b})`;

    const hex = [r, g, b].map((color) => color.toString(16).padStart(2, '0')).join('')

    return `#${hex}`
}

const startGame = () => {
    optionsContainer.innerHTML = ""; // Clear previous options

    gameStatusText.innerText = ``


    correctColor = generateRandomColors();
    // console.log(correctColor);

    let colors = []

    for (let i = 0; i < 6; i++) {
        colors[i] = generateRandomColors()
    }

    // console.log(colors)

    const random = Math.floor(Math.random() * 6)
    const targetColor = colors[random]

    // colorBox.innerHTML = targetColor
    colorBox.style.backgroundColor = targetColor

    colors.forEach((color) => {
        // optionsContainer.innerHTML = '<button style=`background-color:${color}`></button>'
        let button = document.createElement('button')
        button.style.backgroundColor = color
        button.setAttribute('data-testid', 'colorOption')
        optionsContainer.appendChild(button)

        button.addEventListener('click', () => checkGuessColor(color, targetColor)
        )
    })

}

// console.log(confetti())


const checkGuessColor = (selectedColor, targetColor) => {

    if (selectedColor == targetColor) {
        score++

        gameStatusText.innerText = `You've got that correct`
        gameStatusText.style.color = 'green'
        startGame()
    } else {
        gameStatusText.innerText = `Oops!!, You've gotten it wrong`
        gameStatusText.style.color = 'red'
    }
    scoreText.textContent = score
}

resetGameButton.addEventListener("click", () => startGame())
startGame()
// colorBox.style.backgroundColor = targetColor;
