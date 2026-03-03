// components/ObjectModel.vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { watch, onMounted } from 'vue'
import * as THREE from 'three'
import { useModelStore } from '../stores/model' // Импортируем ваш стор
import { ModelMetadata } from '@/utils/modelMetadata';

const props = defineProps<{ 
  filePath: string
}>()

const modelStore = useModelStore()

// Загружаем модель один раз
const { scene } = await useGLTF(props.filePath).execute()
if (!scene) {
  throw new Error("ObjectModel error : scene loading failed")
}

const meta = new ModelMetadata(scene, props.filePath)
modelStore.metadata = meta

const originalMaterials = new Map<string, THREE.Material | THREE.Material[]>()
const clayMaterial = new THREE.MeshStandardMaterial({
  color: 0x999999,
  roughness: 0.8,
  metalness: 0.2
})

const applyRenderMode = (mode: string) => {
  if (!scene) return
  
  scene.traverse((child: any) => {
    if (child.isMesh) {
      if (!originalMaterials.has(child.uuid)) {
        originalMaterials.set(child.uuid, child.material)
      }
      const original = originalMaterials.get(child.uuid)

      if (mode === 'normal') {
        child.material = original
        if (child.material.wireframe !== undefined) child.material.wireframe = false
      } 
      else if (mode === 'clay') {
        child.material = clayMaterial
      } 
      else if (mode === 'wireframe') {
        child.material = original
        child.material.wireframe = true
      }
    }
  })
}

// Следим за состоянием стора напрямую
watch(() => modelStore.renderMode, (newMode) => {
  applyRenderMode(newMode)
}, { immediate: true })

onMounted(() => {
  applyRenderMode(modelStore.renderMode)
})
</script>

<template>
  <primitive :object="scene" />
</template>