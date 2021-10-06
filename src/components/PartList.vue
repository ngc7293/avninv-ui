<template>
    <table class="data-table">
        <tr>
            <th>MFG Part No</th>
            <th>Description</th>
        </tr>
        <part-row v-for="part in parts" :key="part.getManufacturerPartNumber()" :part="part" :client="client"/>
        <part-row :part="null" :client="client"/>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ListPartRequest, ListPartResponse, Part } from '../avninv/catalog/v1/catalog_pb';
import { CatalogClient } from '../avninv/catalog/v1/CatalogServiceClientPb';
import PartRow from './PartRow.vue';

export default defineComponent({
    data() {
        return {
            parts: new Array<Part>()
        };
    },
    props: {
        client: CatalogClient
    },
    components: {
        'part-row': PartRow
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