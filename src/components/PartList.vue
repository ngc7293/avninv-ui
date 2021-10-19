<template>
    <table class="data-table">
        <tr>
            <th>Type</th>
            <th>MFG Part No</th>
            <th>Description</th>
            <th class="number">Quantity</th>
        </tr>
        <part-row v-for="part in parts" :key="part.getName()" :name="part.getName()" />
        <part-row :creating="true" />
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
        this.$store.subscribe((mutation, state) => {
            if (mutation.type == 'setParts') {
                this.parts = state.parts;
            }
        })
    }
});
</script>

<style scoped>
</style>