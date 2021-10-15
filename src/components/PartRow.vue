<template>
    <tr>
        <td><io-select v-model="type" :edit=edit :options="makeTypeOptions()" /></td>
        <td><io-input v-model="manufacturerPartNumber" :edit="edit"/></td>
        <td><io-input v-model="description" :edit="edit"/></td>
        <td>
            <div v-if="!edit"><i class="fas fa-edit" @click="edit = true" /></div>
            <div v-else><i class="fas fa-save" @click="saveEdit" /> <i class="fas fa-ban" @click="cancelEdit"/></div>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
        name: { type: String, default: null },
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
        saveEdit() {
            this.$store.dispatch('updatePart', this.localPart);
        },
        cancelEdit() {
            this.localPart = this.$store.getters.getPartByName(this.name).clone();
            this.edit = false;
        },
        makeTypeOptions() {
            return [
                { id: "resistor", display: "Resistor" },
                { id: "chip", display: "Chip" }
            ]
        }
    },
    mounted() {
        this.localPart = this.$store.getters.getPartByName(this.name).clone();
    }
});
</script>

<style scoped>
.fa-edit:hover {
    color:red;
}
</style>