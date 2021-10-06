<template>
    <div class="app-navbar">
    </div>
    <div class="app-body">
        <div class="app-content">
            <part-list :client="client" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CatalogClient } from './avninv/catalog/v1/CatalogServiceClientPb';
import PartList from './components/PartList.vue'

export default defineComponent({
    data() {
        return {
            client: this.makeClient()
        }
    },
    components: {
        'part-list': PartList
    },
    methods: {
        makeClient(): CatalogClient {
            return new CatalogClient('http://35.203.20.187:8081');
        }
    }
});
</script>

<style scoped>
</style>