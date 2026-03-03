<template>
<div>
    <Button @click="toggle" icon="pi pi-bars" severity="secondary" variant="outlined"/>

    <Popover ref="op">
        <div class="flex flex-col gap-4">
            <SelectButton v-model="renderMode" :options="options" optionLabel="label" optionValue="value" />
        </div>
    </Popover>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Button, Popover, SelectButton } from 'primevue';
import { useModelStore, type RenderMode } from '@/stores/model';

const op = ref();
const toggle = (event:Event) => {
    op.value.toggle(event);
}

const modelStore = useModelStore()
const renderMode = computed({
    get() {
        return modelStore.renderMode
    },
    set(value: string) {
        // runtime check — TypeScript types are erased at runtime, so compare against allowed values
        if (['normal', 'clay', 'wireframe'].includes(value)) {
            modelStore.renderMode = value as RenderMode
        } else {
            console.warn('Invalid renderMode:', value)
        }
    }
})
const options = [
  { label: 'Normal', value: 'normal' },
  { label: 'No Texture', value: 'clay' },
  { label: 'Faces Only', value: 'wireframe' }
]
</script>