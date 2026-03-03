import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import models from '@/utils/data';
import type { Model } from '@/utils/model';

function getPreloadModel(): Model | null {
  const preloadValueRaw = localStorage.getItem("model-id")
  if (preloadValueRaw === undefined) {
    return null
  }
  const preloadValue = Number(preloadValueRaw)
  if (Number.isNaN(preloadValue)) {
    return null
  }

  const preloadModel = models.find((model) => model.id == preloadValue)
  if (!preloadModel) {
    return null
  }
  return preloadModel
} 

class CurrentModel {
  private _value: Model = (getPreloadModel() ?? models[0])!

  getModel() {
    return this._value
  }

  update(id: number) {
    if (id == this._value.id) {
      return
    }

    const newModel = models.find(model => model.id == id)
    if (!newModel) {
      return 
    }
    this._value = newModel
    console.log(newModel)
    localStorage.setItem("model-id", `${newModel.id}`)
  }
}

export const useModelStore = defineStore('model', () => {

  const currentModel = ref(new CurrentModel());

  return {  
    currentModel
  }
})
