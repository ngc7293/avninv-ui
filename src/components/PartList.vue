<template>
    <table>
        <tr>
            <th>MFG Part No</th>
            <th>Description</th>
        </tr>
        <tr v-for="part in parts" :key="part.getManufacturerPartNumber()">
            <td>{{ part.getManufacturerPartNumber() }}</td>
            <td>{{ part.getDescription() }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ListPartRequest, ListPartResponse, Part } from '../avninv/catalog/v1/catalog_pb';
import { CatalogClient } from '../avninv/catalog/v1/CatalogServiceClientPb';

export default defineComponent({
    data() {
        return {
            parts: new Array<Part>()
        };
    },
    props: {
        client: CatalogClient
    },
    methods: {
        listParts() {
            if (this.client) {
                let request = new ListPartRequest();
                request.setParent('org/main/parts');
                this.client.listParts(request, {}, (err, response: ListPartResponse): void => {
                    if (err) {
                        console.log('[' + err.code + '] ' + err.message);
                    } else {
                        this.parts = response.getPartsList();
                        this.parts[0].getManufacturerPartNumber
                        console.log('Parts: ' + this.parts.length);
                    }
                });
            }
        }
    },
    mounted() {
        this.listParts();
    }
});
</script>

<style scoped>

</style>