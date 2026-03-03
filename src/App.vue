

<template>
  <LoadingOverlay v-model="isLoading" />

  <Toolbar v-if="!isLoading"/>

  <div id="canvas-container">
    <TresCanvas clear-color="#111111" shadows window-size>
      <Suspense>
        <Environment preset="studio" /> 
      </Suspense>

      <TresPerspectiveCamera :position="[5, 5, 5]" />
      <OrbitControls />
      
      <TresAmbientLight :intensity="0.5" />

      <ContactShadows
        :opacity="0.6"
        :blur="2.5"
        :scale="20"
        :far="10"
        :resolution="512"
        color="#000000"
      />

        <!-- <AccumulativeShadows
          temporal
          :frames="100"     
          :color="'#111111'"
          :opacity="0.8"
          :scale="20"        
          :position="[0, -0.01, 0]" 
        >
          <RandomizedLights
            :amount="8"        
            :radius="5"        
            :ambient="0.5"
            :intensity="1"
            :position="[5, 5, -5]"
          />
        </AccumulativeShadows> -->

      <Suspense 
      :onFallback="() => isLoading = true"
      :onPending="() => isLoading = true"
      :onResolve="() => isLoading = false">
        <template #default>
          <ObjectModel v-if="currentModel" :key="`${currentModel.getModel().name}`"
          :filePath="currentModel.getModel().filePath" />
        </template>
        
      </Suspense>

        <!-- <AccumulativeShadows
          :blend="100"
          color="#923874"
          once
          :position-y="-0.4"
        /> -->

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

const isLoading = ref(false)

</script>

<style scoped>
#canvas-container {
  width: 100%;
  height: 100vh;
}
</style>