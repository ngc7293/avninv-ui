<template>
    <div class="app-navbar">
    </div>
    <div class="app-body">
        <div class="app-content">
            <part-list />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PartList from './components/PartList.vue'

export default defineComponent({
    data() {
        return {}
    },
    components: {
        'part-list': PartList
    }
});
</script>

<style scoped>
</style>