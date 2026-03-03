<template>

<Dialog v-model:visible="show" :closable="false" :closeOnEscape="false" modal header="Loading" :style="{ width: '25rem' }">
    <p class="mb-4">
        Please wait while the 3D model is loading...
    </p>
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
</Dialog>
</template>

<script lang="ts" setup>
import { Dialog, ProgressBar } from 'primevue';
const show = defineModel({
    required: true,
    type: Boolean,
    default: false,
})

</script>