import Vue from 'vue';
import * as clipboard from 'clipboard-polyfill';
import Component from 'vue-class-component';
import {Issue} from '@/core/entities/issue/model';
import {ISSUES_ACTIONS} from '../../../store/modules/issues';
import {LIST_STATES} from '../../../store/modules/application';
import NotificationConfig from '../../../core/config/notification-config';
import CommentsListItemComponent from './comments-list-item/comments-list-item.component';

@Component({
    components: {
        'comment-list-item': CommentsListItemComponent,
    },
})
export default class CommentsListComponent extends Vue {

    get issues(): Issue[] {
        return this.$store.getters.getIssues;
    }

    get listStatus(): LIST_STATES {
        return this.$store.getters.getListStatus;
    }

    public isActive(): boolean {
        return this.listStatus === LIST_STATES.OPEN;
    }

    public beforeMount() {
        this.$store.dispatch(ISSUES_ACTIONS.loadIssues);
    }
}

