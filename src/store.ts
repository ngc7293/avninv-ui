import { createStore, createLogger} from 'vuex';

import { ListPartRequest, Part, UpdatePartRequest } from './avninv/catalog/v1/catalog_pb';
import { CatalogClient } from './avninv/catalog/v1/CatalogServiceClientPb';
import { request } from 'http';

interface State {
    client: CatalogClient;
    parts: Array<Part>;
}

export default createStore({
    state() {
        return {
            client: new CatalogClient('http://35.203.20.187:8081'),
            parts: new Array<Part>()
        }
    },
    getters: {
        getParts(state: State) : Array<Part> { return state.parts; },
        getPartByName: (state: State) => (name: string) => { return state.parts.find(part => part.getName() == name); }
    },
    mutations: {
        setParts(state, parts: Array<Part>) { state.parts = parts; }
    },
    actions: {
        async fetchParts({ state }) {
            let request = new ListPartRequest();
            request.setParent('orgs/main/parts');
            let response = await state.client.listParts(request, {});
            this.commit('setParts', response.getPartsList());
        },
        async updatePart({ state }, part: Part) {
            let request = new UpdatePartRequest();
            request.setName(part.getName());
            request.setPart(part);
            await state.client.updatePart(request, {});
            await this.dispatch('fetchParts');
        }
    },
    plugins: [createLogger()]
});