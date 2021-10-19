<template>
    <tr>
        <td><io-select v-model="schemaName" :editing=editing :options="makeSchemaNameOptions()" /></td>
        <td><io-input type="text" v-model="manufacturerPartNumber" :editing="editing"/></td>
        <td><io-input type="text" v-model="description" :editing="editing"/></td>
        <td class="number"><io-spinner v-model="quantity" :editing="editing"/></td>
        <td>
            <div v-if="!editing">
                <i class="fas fa-edit" @click="editing = true" />
                <i class="fas fa-trash" @click="deletePart" />
            </div>
            <div v-else>
                <i class="fas fa-save" @click="saveEdit" />
                <i class="fas fa-undo" @click="cancelEdit"/>
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Part } from '../avninv/catalog/v1/catalog_pb';

import StringInput from './io/StringInput.vue';
import NumberInput from './io/NumberInput.vue';
import Select from './io/Select.vue'

export default defineComponent({
    data() {
        return {
            editing: false,
            part: new Part()
        };
    },
    props: {
        name: { type: String, default: null },
        creating: { type: Boolean, default: false }
    },
    components: {
        'io-input': StringInput,
        'io-spinner': NumberInput,
        'io-select': Select
    },
    computed: {
        schemaName: {
            get() { return this.part.getSchemaName(); },
            set(value: string) { this.part.setSchemaName(value); }
        },
        manufacturerPartNumber: {
            get() { return this.part.getManufacturerPartNumber(); },
            set(value: string) { this.part.setManufacturerPartNumber(value); }
        },
        description: {
            get() { return this.part.getDescription(); },
            set(value: string) { this.part.setDescription(value); }
        },
        quantity: {
            get() { return this.part.getQuantity(); },
            set(value: number) { this.part.setQuantity(value); }
        }
    },
    methods: {
        async saveEdit() {
            let rc: boolean = false;
            if (this.creating) {
                rc = await this.$store.dispatch('createPart', this.part);
            } else {
                rc = await this.$store.dispatch('updatePart', this.part);
                this.editing = false;
            }
        },
        cancelEdit() {
            if (this.creating) {
                this.part = new Part();
            } else {
                this.part = this.$store.getters.getPartByName(this.name).clone();
                this.editing = false;
            }
        },
        deletePart() {
            this.$store.dispatch('deletePart', this.part);
        },
        makeSchemaNameOptions() {
            return [
                { id: "orgs/main/partschema/resistor", display: "Resistor" },
                { id: "orgs/main/partschema/chip", display: "Chip" }
            ]
        }
    },
    mounted() {
        if (this.creating) {
            this.part = new Part();
            this.editing = true;
        } else {
            this.part = this.$store.getters.getPartByName(this.name).clone();
        }
    }
});
</script>

<style scoped>
.fas:hover {
    color:red;
}
.fas {
    margin-right: 1em;
}
</style>