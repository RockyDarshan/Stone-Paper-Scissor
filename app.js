let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was a Draw";
    msg.style.backgroundColor = "orange";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = `Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const checkGameOver = () => {
    if (userScore === 10 || compScore === 10) {
        const winner = userScore === 10 ? "You Win!" : "Computer Wins!";
        msg.innerText = `${winner} Game Over!`;
        msg.style.backgroundColor = "blue";

        // Disable further choices
        choices.forEach(choice => {
            choice.style.pointerEvents = "none";
        });

        // Create and display the restart button
        const restartButton = document.createElement("button");
        restartButton.innerText = "Restart Game";
        restartButton.style.padding = "1rem";
        restartButton.style.marginTop = "2rem";
        restartButton.style.fontSize = "1.5rem";
        restartButton.style.cursor = "pointer";
        restartButton.style.backgroundColor = "#081b31";
        restartButton.style.color = "white";
        restartButton.style.border = "none";
        restartButton.style.borderRadius = "5px";

        // Append the button to the message container
        msg.parentElement.appendChild(restartButton);

        // Add restart functionality
        restartButton.addEventListener("click", () => {
            restartGame();
            restartButton.remove(); // Remove button after restart
        });
    }
};

const restartGame = () => {
    userScore = 0;
    compScore = 0;
    userScorepara.innerText = userScore;
    compScorepara.innerText = compScore;
    msg.innerText = "Game Restarted! Make your move.";
    msg.style.backgroundColor = "#081b31";

    // Re-enable choices
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto";
    });
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    // Check if the game is over
    checkGameOver();
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
