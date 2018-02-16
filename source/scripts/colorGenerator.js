
export default (numberOfColors) => {
    /*******
        for total number of colors randomly create 3 integers between 0 and 255 inclusive
        and return an array of objects. One object per color with 3 properties of 'red',
        'green', and 'blue'
    *******/

    let colorArray = [];

    for(var i = 0; i < numberOfColors; i++) {
        let colorObject = {
            'red': getRandomNumber(0,256),
            'green': getRandomNumber(0,256),
            'blue': getRandomNumber(0,256)
        };

        colorArray.push(colorObject);
    }

    return colorArray;
}

var getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}