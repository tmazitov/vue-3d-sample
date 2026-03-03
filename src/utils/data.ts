import { Model } from "./model";

const models:Array<Model> = [
    new Model(1, 'Phoenix Car', 'models/phoenix/scene.gltf', "Standard size and resolution model that loads perfectly on different devices."),
    new Model(2, 'Dragon Statue', 'models/dragon/scene.gltf', "Small-scale model with high detail."),
    new Model(3, 'Nissan Nismo', 'models/nissan/scene.gltf', "Large model that requires significant resources. Ideal for stress-testing smartphones and computers (without GPUs)."),
]

if (models.length == 0) {
    throw Error("not enough models")
}

export default models;