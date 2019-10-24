import {ClientState} from './client';

export const APPLICATION_MUTATIONS = {
    changeListState: 'applicationChangeListState',
};

export const APPLICATION_ACTIONS = {};

export enum LIST_STATES {
    OPEN,
    HIDDEN,
}

export interface ApplicationState {
    listState: LIST_STATES;
}

const state: ApplicationState = {
    listState: LIST_STATES.HIDDEN,
};

export default {
    state,
    mutations: {
        [APPLICATION_MUTATIONS.changeListState]: (applicationState: ApplicationState, listState: LIST_STATES) => {
            applicationState.listState = listState;
        },
    },
    getters: {
        getListStatus: (applicationState: ApplicationState): LIST_STATES => applicationState.listState,
    },
    actions: {},
};
