<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { watch, onMounted } from 'vue'
import * as THREE from 'three'

const props = defineProps<{ 
  filePath: string,
  mode: string 
}>()

const model = await useGLTF(props.filePath).execute()

// 1. Storage for original materials so we can go back to "Normal"
const originalMaterials = new Map<string, THREE.Material | THREE.Material[]>()

// 2. Create a shared "Clay" material
const clayMaterial = new THREE.MeshStandardMaterial({
  color: 0x999999,
  roughness: 0.8,
  metalness: 0.2
})

const applyRenderMode = (mode: string) => {
  if (!model || !model.scene) return

  model.scene.traverse((child: any) => {
    if (child.isMesh) {
      // Save original material if not already saved
      if (!originalMaterials.has(child.uuid)) {
        originalMaterials.set(child.uuid, child.material)
      }

      const original = originalMaterials.get(child.uuid)

      if (mode === 'normal') {
        child.material = original
        child.material.wireframe = false
      } 
      else if (mode === 'clay') {
        child.material = clayMaterial
        child.material.wireframe = false
      } 
      else if (mode === 'wireframe') {
        // We use the original material but turn on wireframe
        child.material = original
        child.material.wireframe = true
      }
      
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

// Watch for mode changes from the parent component
watch(() => props.mode, (newMode) => {
  applyRenderMode(newMode)
}, { immediate: true })

onMounted(() => {
  applyRenderMode(props.mode)
})
</script>

<template>
  <primitive :object="model.scene" />
</template>