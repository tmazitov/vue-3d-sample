<template>
<Toolbar class="top-4 left-4 right-4 absolute z-1">

    <template #center>
        <ToolBarTitle v-if="currentModel"
        v-model="currentModel"/>
    </template>

    <template #end>
        <ToolBarPreferences/>
    </template>
</Toolbar>
</template>

<script lang="ts" setup>
import { useModelStore } from '@/stores/model';
import { Toolbar, Button, IconField, InputIcon, Checkbox } from 'primevue';
import ToolBarTitle from './ToolBarTitle.vue'
import ToolBarPreferences from './ToolBarPreferences.vue'
import { computed } from 'vue';
import type { Model } from '@/utils/model';

const modelStore = useModelStore()

const currentModel = computed({
    get() {
        return modelStore.currentModel.getModel()
    },
    set(model: Model) {
        console.log("modelStore", model)
        modelStore.currentModel.update(model.id)
    }
})

</script>
