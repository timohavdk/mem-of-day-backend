function getRandomIntFromInterval(min, max) {
    let result = Math.floor(Math.random() * max);

    while (result < min) {
        result = Math.floor(Math.random() * max);
    }

    return result;
}

const getRandomColor = () => {
    return `rgb(${getRandomIntFromInterval(0, 255)}, ${getRandomIntFromInterval(0, 255)}, ${getRandomIntFromInterval(0, 255)})`;
};

const getRandomFont = () => {
    const fonts = ['Arial', 'Verdana', 'Tahoma', 'Times New Roman', 'Georgia', 'Garamond'];

    return fonts[getRandomIntFromInterval(0, fonts.length - 1)];
}

const getRandomSize = () => {
    return `${getRandomIntFromInterval(16, 24)}`;
};

export const randomStyles = {
    color: getRandomColor,
    font: getRandomFont,
    size: getRandomSize,
};