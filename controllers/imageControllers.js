import { compositeWordInImage } from "../lib/composite.js";

const generateController = async (request, response) => {
    const bufferImage = await compositeWordInImage();

    response.set('Content-Type', 'image/jpeg');
    response.send(bufferImage);
}

export const imageControllers = {
    generate: generateController,
};