import { createStore, createLogger} from 'vuex';

import { CreatePartRequest, DeletePartRequest, ListPartRequest, Part, UpdatePartRequest } from './avninv/catalog/v1/catalog_pb';
import { CatalogClient } from './avninv/catalog/v1/CatalogServiceClientPb';

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
        async createPart({ state }, part: Part) {
            let request = new CreatePartRequest();
            request.setParent('orgs/main/parts');
            request.setPart(part);

            try {
                await state.client.createPart(request, {});
                await this.dispatch('fetchParts');
                return true
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async deletePart({ state }, part: Part) {
            let request = new DeletePartRequest();
            request.setName(part.getName());
            
            try {
                await state.client.deletePart(request, {});
            } catch (error) {
                console.log(error);
            }

            await this.dispatch('fetchParts');
        },
        async updatePart({ state }, part: Part) {
            let request = new UpdatePartRequest();
            request.setName(part.getName());
            request.setPart(part);

            try {
                await state.client.updatePart(request, {});
                await this.dispatch('fetchParts');
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    plugins: [createLogger()]
});