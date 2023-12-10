import {getRandomIntFromInterval} from './random.js'

const getRandomColor = () => {
    return `rgb(${getRandomIntFromInterval(0, 255)}, ${getRandomIntFromInterval(0, 255)}, ${getRandomIntFromInterval(0, 255)})`;
};

const getRandomFont = () => {
    const fonts = ['Arial', 'Verdana', 'Tahoma', 'Times New Roman', 'Georgia', 'Garamond'];

    return fonts[getRandomIntFromInterval(0, fonts.length - 1)];
}

const getRandomSize = () => {
    return `${getRandomIntFromInterval(60, 80)}`;
};

export const randomStyles = {
    color: getRandomColor,
    font: getRandomFont,
    size: getRandomSize,
};