<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
// import { GLTF } from 'three-stdlib'

const props = defineProps({
  filePath: {
    type: String,
    required: true,
  }
})

// By using execute(), 'model' becomes the actual GLTF data returned by the hook
const model = await useGLTF(props.filePath).execute()
if (!model) {
  throw new Error(`Failed to load model from path: ${props.filePath}`)
}
// Now TypeScript sees animations perfectly
const animations = model.animations 
const scene = model.scene
scene.traverse((child: any) => {
  if (child.isMesh) {
      // 1. Hide anything that looks like a floor/plane/ground
      if (child.name.toLowerCase().includes('floor') || 
          child.name.toLowerCase().includes('plane') || 
          child.name.toLowerCase().includes('ground')) {
        child.visible = false 
      }

      // 2. Ensure the rest of the car casts shadows
      child.castShadow = true
      child.receiveShadow = true
    }
})

</script>

<template>
  <primitive :object="scene" />
</template>