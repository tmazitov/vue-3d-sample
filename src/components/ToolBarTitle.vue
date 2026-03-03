<template>
<div>
    <h3 v-if="currentModel"  @click="toggle"
    class="text-lg cursor-pointer hover:text-gray-300 transition-colors select-none">
        <i class="pi pi-chevron-down text-gray-500"></i>
        {{ currentModel.name }}
    </h3>

    <Popover ref="op">
        <div class="flex flex-col gap-4">
            <div class="px-3 py-2 text-lg cursor-pointer hover:text-gray-300 transition-colors select-none"  
            v-for="model in models" :key="`item-${model.id}`"
            @click="() => clickHandler(model)">
                {{ model.name }}
            </div>
        </div>
    </Popover>
</div>
</template>

<script lang="ts" setup>
import models from '@/utils/data';
import { Model } from '@/utils/model';
import { ref } from "vue";
import { Popover } from 'primevue';

const currentModel = defineModel({
    type: Model,
    required: true,
})


const op = ref();
const toggle = (event:Event) => {
    op.value.toggle(event);
}

const clickHandler = (model:Model) => {
    currentModel.value = model
    op.value.toggle(event);
}

</script>