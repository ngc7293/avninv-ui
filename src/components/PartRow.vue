<template>
    <tr>
        <td><io-select v-model="type" :edit=edit :options="makeTypeOptions()" /></td>
        <td><io-input v-model="manufacturerPartNumber" :edit="edit"/></td>
        <td><io-input v-model="description" :edit="edit"/></td>
        <td><button @click="edit = !edit">edit</button></td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CatalogClient } from '../avninv/catalog/v1/CatalogServiceClientPb';
import { Part } from '../avninv/catalog/v1/catalog_pb';

import Input from './io/Input.vue';
import Select from './io/Select.vue'

export default defineComponent({
    data() {
        return {
            edit: false,
            localPart: new Part()
        };
    },
    props: {
        client: { type: CatalogClient, required: true },
        part: { type: Part, default: null },
    },
    components: {
        'io-input': Input,
        'io-select': Select
    },
    computed: {
        type: {
            get() { return this.localPart.getType(); },
            set(value: string) { this.localPart.setType(value); }
        },
        manufacturerPartNumber: {
            get() { return this.localPart.getManufacturerPartNumber(); },
            set(value: string) { this.localPart.setManufacturerPartNumber(value); }
        },
        description: {
            get() { return this.localPart.getDescription(); },
            set(value: string) { this.localPart.setDescription(value); }
        }
    },
    methods: {
        createPart(event: Event) {
        },
        makeTypeOptions() {
            return [
                { id: "resistor", display: "Resistor" },
                { id: "chip", display: "Chip" }
            ]
        }
    },
    mounted() {
        if (this.part === null) {
            this.localPart = new Part();
            this.edit = true;
        } else {
            this.localPart = this.part;
        }
    }
});
</script>

<style scoped>
</style>