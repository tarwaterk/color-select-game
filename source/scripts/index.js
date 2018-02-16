import colorGenerator from './colorGenerator';

window.onload = () => {
    gameLogic.addEventListeners();
}

var gameLogic = {
    addEventListeners: () => {
        let newGameBtn = document.querySelector(".js-new-game-btn");
        let difficultyBtns = document.querySelectorAll(".js-difficulty-btn");

        newGameBtn.addEventListener("click", () => {
            let colors = colorGenerator(6);
            console.log(colors);
        });

        difficultyBtns.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("difficulty button");
            });
        });
    }
}