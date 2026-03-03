

<template>
  <LoadingOverlay v-model="isLoading" />
  <Toolbar v-if="!isLoading"/>

  <div id="canvas-container">
    <TresCanvas clear-color="#111111" shadows window-size>
      <Suspense>
        <Environment preset="studio" /> 
      </Suspense>

      <TresPerspectiveCamera make-default :position="[5, 5, 5]" />
      <OrbitControls make-default />
      
      <TresAmbientLight :intensity="0.5" />
      <ContactShadows :opacity="0.6" :blur="2.5" :scale="20" color="#000000" />

      <Suspense 
        @pending="isLoading = true"
        @resolve="isLoading = false"
      >
        <template #default>
          <ObjectModel 
            v-if="currentModel"
            :key="currentModel.getModel().filePath"
            :filePath="currentModel.getModel().filePath" 
          />
        </template>
      </Suspense>

      <TresGridHelper :args="[10, 10]" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { TresCanvas, } from '@tresjs/core'
import { 
  OrbitControls, 
  AccumulativeShadows, 
  RandomizedLights,
  Environment,
  ContactShadows,
} from '@tresjs/cientos'
import Toolbar from './components/ToolBar.vue'
import ObjectModel from './components/ObjectModel.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import { computed, ref } from 'vue'
import { useModelStore } from './stores/model'

const modelStore = useModelStore()
const currentModel = computed(() => modelStore.currentModel)
const renderMode = computed(() => modelStore.renderMode)
const isLoading = ref(false)

</script>

<style scoped>
#canvas-container {
  width: 100%;
  height: 100vh;
}
</style>