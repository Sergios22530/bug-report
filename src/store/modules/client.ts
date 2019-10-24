import {ActionContext} from 'vuex';
import {User} from '@/core/entities/user/model';

export const CLIENT_MUTATIONS = {
    setInitState: 'setClientInitState',
    setClient: 'setClientClient',
    setTaskUrl: 'setClientTaskUrl',
};

export const CLIENT_ACTIONS = {
    clearClient: 'clearClient',
};

export interface ClientState {
    model?: User;
    taskUrl: string;
}

const state: ClientState = {
    model: undefined,
    taskUrl: '',
};

export default {
    state,
    mutations: {
        [CLIENT_MUTATIONS.setInitState]: (clientState: ClientState, initState: ClientState) => {
            Object.assign(clientState, initState);
        },
        [CLIENT_MUTATIONS.setClient]: (clientState: ClientState, client: User) => {
            clientState.model = client;
        },
        [CLIENT_MUTATIONS.setTaskUrl]: (clientState: ClientState, url: string) => {
            clientState.taskUrl = url.replace('https://doris.worksection.com', '');
        },
    },
    getters: {
        getClient: (clientState: ClientState): User | undefined => clientState.model,
        getTaskUrl: (clientState: ClientState): string => clientState.taskUrl,
    },
    actions: {
        [CLIENT_ACTIONS.clearClient]: (context: ActionContext<ClientState, any>) => {
            return new Promise(() => {
                context.commit(CLIENT_MUTATIONS.setClient, undefined);
            });
        },
    },
};
