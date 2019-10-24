import Vue from 'vue';
import Component from 'vue-class-component';
import ApplicationNavigationComponent from '../components/application-navigation/application-navigation.component';
import BugReportToolComponent from '../components/bug-report-tool/bug-report-tool.component';
import {SCREEN_ACTIONS} from '../../store/modules/screen';
import AuthorizationComponent from '../components/authorization/authorization.component';
import {User} from '@/core/entities/user/model';
import CommentsListComponent from '../components/comments-list/comments-list.component';

@Component({
    components: {
        'application-navigation': ApplicationNavigationComponent,
        'bug-report-tool': BugReportToolComponent,
        'authorization': AuthorizationComponent,
        'comments-list': CommentsListComponent,
    },
})
export default class AppComponent extends Vue {

    get client(): User | undefined {
        return this.$store.getters.getClient;
    }

    public showModal() {
        if (!this.client) {
            this.$modal.show('authorization');
            return;
        }

        this.$modal.show('bug-report-tool');
    }

    public cleanStore() {
        this.$store.dispatch(SCREEN_ACTIONS.setSrc, '');
    }

    public beforeMount() {
        const codes = [
            'Q'.charCodeAt(0),
            'W'.charCodeAt(0),
            'E'.charCodeAt(0),
        ];
        let pressed = {};

        document.onkeydown = (e) => {
            e = e || window.event;

            Object.assign(pressed, {[e.keyCode]: true});

            for (const code of codes) {
                // @ts-ignore
                if (!pressed[code]) {
                    return;
                }
            }

            pressed = {};

            this.showModal();
        };

        document.onkeyup = (e) => {
            e = e || window.event;

            // @ts-ignore
            delete pressed[e.keyCode];
        };
    }
}

