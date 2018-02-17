import colorGenerator from './colorGenerator';
import ColorBlock from './ColorBlock';
import {getRandomNumber} from './helpers';

window.onload = () => {
    gameState.blockContainer = document.querySelector(".color-block-container");
    gameState.displayedColorContainer = document.querySelector(".header__color");
    gameLogic.addButtonEventListeners();
    gameLogic.createNewGame();
}

var gameState = {
    numberOfBlocks: 6,
    displayedColor: {},
    currentColors: [],
    currentColorBlocks: [],
    blockContainer: null,
    displayedColorContainer: null
}

var gameLogic = {
    addButtonEventListeners: () => {
        let newGameBtn = document.querySelector(".js-new-game-btn");
        let difficultyBtns = document.querySelectorAll(".js-difficulty-btn");

        newGameBtn.addEventListener("click", (event) => {
            event.preventDefault();

            gameLogic.createNewGame();
        });

        difficultyBtns.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();

                let difficulty = event.target.dataset.difficulty;
                gameLogic.setDifficulty(difficulty, gameState.blockContainer);
            });
        });
    },
    addBlockEventListeners: () => {
        let blocks = document.querySelectorAll(".color-block");

        blocks.forEach((block) => {
            block.addEventListener("click", (event) => {
                event.preventDefault();

                let blockColor = {
                    red: parseInt(event.target.dataset.red),
                    green: parseInt(event.target.dataset.green),
                    blue: parseInt(event.target.dataset.blue)
                };

                let colorsMatch = gameLogic.compareColors(gameState.displayedColor, blockColor);
                if(colorsMatch) {
                    gameLogic.handleSuccess();
                } else {
                    gameLogic.handleFailure();
                }
            });
        });
    },
    compareColors: (color1, color2) => {
        let redMatches = color1.red === color2.red;
        let greenMatches = color1.green === color2.green;
        let blueMatches = color1.blue === color2.blue;

        if(redMatches && greenMatches && blueMatches) {
            return true;
        }

        return false;
    },
    handleSuccess: () => {
        let successElement = document.querySelector(".message--success");
        successElement.classList.add("active");
        window.setTimeout(()=>{
            successElement.classList.remove("active");
        }, 500);
        gameLogic.createNewGame();
    },
    handleFailure: () => {
        let failureElement = document.querySelector(".message--failure");
        failureElement.classList.add("active");
        window.setTimeout(()=>{
            failureElement.classList.remove("active");
        }, 500);
    },
    createNewGame: () => {
        gameState.currentColors = colorGenerator(gameState.numberOfBlocks);
        gameState.currentColorBlocks = gameLogic.createBlocks(gameState.currentColors);
        gameState.displayedColor = gameLogic.selectDisplayedColor(gameState.currentColors);

        gameLogic.appendDisplayedColor(gameState.displayedColor, gameState.displayedColorContainer);
        gameLogic.appendBlocks(gameState.currentColorBlocks, gameState.blockContainer, gameLogic.addBlockEventListeners);
    },
    setDifficulty: (difficultyLevel, blockContainer) => {
        switch(difficultyLevel) {
            case 'easy':
                gameState.numberOfBlocks = 4;
                blockContainer.classList.remove("color-block-container--hard");
                blockContainer.classList.add("color-block-container--easy");
                break;
            case 'hard':
                gameState.numberOfBlocks = 6;
                blockContainer.classList.remove("color-block-container--easy");
                blockContainer.classList.add("color-block-container--hard");
                break;
        }

        gameLogic.createNewGame();

        return gameState.numberOfBlocks;
    },
    createBlocks: (colorArray = []) => {
        let colorBlocks = [];

        colorArray.forEach((color) => {
            let colorBlockInstance = new ColorBlock(color);
            let colorBlockEl = colorBlockInstance.createBlock();
            colorBlocks.push(colorBlockEl);
        });

        return colorBlocks;
    },
    selectDisplayedColor: (colorArray) => {
        var index = getRandomNumber(0, gameState.numberOfBlocks - 1);
        
        return colorArray[index];
    },
    appendDisplayedColor: (color, container) => {
        let colorText = "RGB(" + color.red + ", " + color.green + ", " + color.blue + ")";
        container.textContent = colorText;

        return colorText;
    },
    appendBlocks: (colorBlocksArray = [], containerElement, callback) => {
        //clear out element to contain the blocks
        while(containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }

        //add blocks to containing element
        colorBlocksArray.forEach((colorBlock) => {
            containerElement.appendChild(colorBlock);
        });

        callback();
    }

}