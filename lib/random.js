export function getRandomIntFromInterval(min, max) {
    let result = Math.floor(Math.random() * max);

    while (result < min) {
        result = Math.floor(Math.random() * max);
    }

    return result;
}