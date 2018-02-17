export default class ColorBlock {
    constructor(colorObject = {}) {
        this.red = colorObject.red || 0;
        this.green = colorObject.green || 0;
        this.blue = colorObject.blue || 0;
    }

    createBlock() {
        let backgroundString = "rgb(" + this.red + ","
                                    + this.green + ","
                                    + this.blue + ")"
        let block = document.createElement("a");
        block.setAttribute("href", "#");
        block.setAttribute("class", "color-block");
        block.setAttribute("data-red", this.red);
        block.setAttribute("data-green", this.green);
        block.setAttribute("data-blue", this.blue);
        block.style.background = backgroundString;
        
        return block;
    }
}