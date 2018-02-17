import colorGenerator from './colorGenerator';
import ColorBlock from './ColorBlock';
import {getRandomNumber} from './helpers';

window.onload = () => {
    gameState.blockContainer = document.querySelector(".color-block-container");
    gameState.displayedColorContainer = document.querySelector(".header__color");
    gameState.currentColors = colorGenerator(gameState.numberOfBlocks);
    gameState.currentColorBlocks = gameLogic.createBlocks(gameState.currentColors);
    gameState.displayedColor = gameLogic.selectDisplayedColor(gameState.currentColors);

    gameLogic.appendDisplayedColor(gameState.displayedColor, gameState.displayedColorContainer);
    gameLogic.appendBlocks(gameState.currentColorBlocks, gameState.blockContainer, gameLogic.addBlockEventListeners);
    gameLogic.addButtonEventListeners();
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

        newGameBtn.addEventListener("click", () => {
            let colors = colorGenerator(6);
            console.log(colors);
        });

        difficultyBtns.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("difficulty button");
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
            });
        });
    },
    compareColors: (color1, color2) => {
        console.log(color1, color2);
        let redMatches = color1.red === color2.red;
        let greenMatches = color1.green === color2.green;
        let blueMatches = color1.blue === color2.blue;

        if(redMatches && greenMatches && blueMatches) {
            console.log("MATCH!");
            return true;
        }

        return false;
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
        var index = getRandomNumber(0,6);
        
        return colorArray[index];
    },
    appendDisplayedColor: (color, container) => {
        let colorText = "RGB(" + color.red + ", " + color.green + ", " + color.blue + ")";
        container.textContent = colorText;

        return colorText;
    },
    appendBlocks: (colorBlocksArray = [], containerElement, callback) => {
        colorBlocksArray.forEach((colorBlock) => {
            containerElement.appendChild(colorBlock);
        });

        callback();
    }

}