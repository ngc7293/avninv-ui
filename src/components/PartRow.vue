<template>
    <tr>
        <td>
            <select :value="part ? part.getType() : 'none'" v-model="data.type">
                <option value="none"></option>
                <option value="resistance">Resitance</option>
                <option value="chip">Chip</option>
            </select>
        </td>
        <td v-if="part">{{ data.mfgpn }}</td>
        <td v-if="!part"><input type="text" v-model="data.mfgpn"/></td>
        <td v-if="part">{{ data.description }}</td>
        <td v-if="!part"><input type="text" v-model="data.description"/></td>
        <td>
            <button v-if="!part" v-on:click="createPart">Add</button>
            <button v-if="part" v-on:click="deletePart">Remove</button>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CatalogClient } from '../avninv/catalog/v1/CatalogServiceClientPb';
import { CreatePartRequest, Part } from '../avninv/catalog/v1/catalog_pb';

export default defineComponent({
    data() {
        return {
            editable: false,
            data: {
                type: '',
                mfgpn: '',
                description: ''
            }
        };
    },
    props: {
        client: CatalogClient,
        part: Part,
    },
    methods: {
        createPart(event: Event) {
            console.log('Create')
            console.log(this.editable)
            console.log(this.part === null)
            console.log(this.client)
            if (this.editable && this.part === null && this.client) {
                let part = new Part();
                part.setType(this.data.type);
                part.setManufacturerPartNumber(this.data.mfgpn);
                part.setDescription(this.data.description);

                let request = new CreatePartRequest();
                request.setParent('org/main/parts');
                request.setPart(part);
                this.client.createPart(request, {}, (err, response) => {
                    if (err) {
                        console.log('[' + err.code + '] ' + err.message)
                    }
                });
            }
        },
        updateData() {
            if (this.part) {
                this.data = {
                    type: this.part.getType(),
                    mfgpn: this.part.getManufacturerPartNumber(),
                    description: this.part.getDescription()
                }
            }
        }
    },
    mounted() {
        this.updateData();
        if (this.part === null) {
            this.editable = true;
        }
    }
});
</script>

<style scoped>
</style>