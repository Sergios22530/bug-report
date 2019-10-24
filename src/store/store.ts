import Vue from 'vue';
import Vuex from 'vuex';
import Screen from './modules/screen';
import Client from './modules/client';
import Issues from './modules/issues';
import Application from './modules/application';
import {SynchronizationPlugin} from './plugins/synchronization';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        screen: Screen,
        issues: Issues,
        client: Client,
        application: Application,
    },
    plugins: [SynchronizationPlugin],
});

export default store;
