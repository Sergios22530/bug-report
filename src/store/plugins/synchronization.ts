import {SCREEN_MUTATIONS, ScreenState} from '../modules/screen';
import {Store} from 'vuex';
import {CLIENT_MUTATIONS} from '../modules/client';

interface StateInterface {
    screen: ScreenState;
}

interface MutationInterface {
    payload: any;
    type: string;
}

export const SynchronizationPlugin = (store: Store<any>) => {
    const initState = localStorage.getItem('state');
    if (initState) {
        const rootState = JSON.parse(initState);
        const screenState = rootState.screen;
        const clientState = rootState.client;

        store.commit(SCREEN_MUTATIONS.setInitState, screenState || {});
        store.commit(CLIENT_MUTATIONS.setInitState, clientState || {});
    }

    store.subscribe((mutation: MutationInterface, state: StateInterface) => {
        localStorage.setItem('state', JSON.stringify(state));
    });
};
