import Vue from 'vue';
import Component from 'vue-class-component';
import {User} from '@/core/entities/user/model';
import {APPLICATION_MUTATIONS, LIST_STATES} from '../../../store/modules/application';

@Component({})
export default class ApplicationNavigationComponent extends Vue {

    get client(): User | undefined {
        return this.$store.getters.getClient;
    }

    get listStatus(): LIST_STATES {
        return this.$store.getters.getListStatus;
    }

    public showCanvasModal() {
        if (!this.client) {
            this.showAuthorizationModal();
            return;
        }

        this.$modal.show('bug-report-tool');
    }

    public showAuthorizationModal() {
        this.$modal.show('authorization');
    }

    public isListActive(): boolean {
        return this.listStatus === LIST_STATES.OPEN;
    }

    public toggleListStatus() {
        const newListStatus = this.listStatus === LIST_STATES.OPEN ? LIST_STATES.HIDDEN : LIST_STATES.OPEN;
        this.$store.commit(APPLICATION_MUTATIONS.changeListState, newListStatus);
    }

    // public showListMenu() {
    // }
}
