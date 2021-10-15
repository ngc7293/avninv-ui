<template>
    <table class="data-table">
        <tr>
            <th>Type</th>
            <th>MFG Part No</th>
            <th>Description</th>
        </tr>
        <part-row v-for="part in parts" :key="part.getManufacturerPartNumber()" :name="part.getName()" />
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Part } from '../avninv/catalog/v1/catalog_pb';
import PartRow from './PartRow.vue';

export default defineComponent({
    data() {
        return {
            parts: new Array<Part>()
        };
    },
    components: {
        'part-row': PartRow
    },
    methods: {
        async listParts() {
            await this.$store.dispatch('fetchParts');
            this.parts = this.$store.state.parts;
        },
        emptyPart() {
            return new Part();
        }
    },
    mounted() {
        this.listParts();
    }
});
</script>

<style scoped>
</style>