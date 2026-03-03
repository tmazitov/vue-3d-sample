import { Model } from "./model";

const models:Array<Model> = [
    new Model(1, 'Phoenix Car', '/models/car/scene.gltf'),
    new Model(2, 'Dragon Statue', '/models/dragon/scene.gltf'),
]

if (models.length == 0) {
    throw Error("not enough models")
}

export default models;