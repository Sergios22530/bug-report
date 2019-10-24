import Vue from 'vue';
import Component from 'vue-class-component';
import {User} from '@/core/entities/user/model';
import {CLIENT_ACTIONS, CLIENT_MUTATIONS} from '../../../store/modules/client';
import {Schema} from '../form-generator/settings/interfaces';
import {FORM_FIELDS} from '../form-generator/settings/fields';
import {UserMapper} from '../../../core/entities/user/mapper';
import {RequestCriteria} from '../../../core/services/request-criteria';
import {UserCollection} from '../../../core/entities/user/collection';
import {ErrorResponseInterface} from '../../../core/services/request';
import NotificationConfig from '../../../core/config/notification-config';

@Component({})
export default class AuthorizationComponent extends Vue {
    public loading: boolean = false;

    public model: any = {
        email: '',
        url: '',
    };

    public formError = '';

    public schema: Schema = {
        fields: [
            FORM_FIELDS.email(),
            FORM_FIELDS.taskUrl(),
            FORM_FIELDS.submit(this.loginUser, {buttonText: 'Авторизоваться'}),
        ],
    };

    get client(): User | undefined {
        return this.$store.getters.getClient;
    }

    public loginUser() {
        const userMapper = new UserMapper();
        const criteria = new RequestCriteria({
            condition: {email: this.model.email},
        });

        this.loading = true;

        userMapper.findByAttributes(criteria).then((collection: UserCollection) => {
            if (collection.isEmpty()) {

                this.$notify(NotificationConfig.getSuccessConfig(`Пользователь ${this.model.email} не найден!`));

                this.loading = false;
                return;
            }

            // @ts-ignore
            const user: User = collection.getEntities()[0];
            this.$store.commit(CLIENT_MUTATIONS.setClient, user);
            this.$store.commit(CLIENT_MUTATIONS.setTaskUrl, this.model.url);

            this.loading = false;
            const message = `Ты зарегистировался как ${user.firstName}. Добро пожаловать!`;
            this.$notify(NotificationConfig.getSuccessConfig(message, 'Здравствуй!'));
            this.$modal.hide('authorization');
        }, (error: ErrorResponseInterface) => {
            this.$notify(NotificationConfig.getErrorsConfig(error.message));
            this.loading = false;
        });
    }

    public clearUser() {
        this.$store.dispatch(CLIENT_ACTIONS.clearClient);
    }
}
