import Vue from 'vue';
import Component from 'vue-class-component';
import {SchemaDefaultField, Schema} from '../form-generator/settings/interfaces';
import {FORM_FIELDS} from '../form-generator/settings/fields';
import {detect} from 'detect-browser';
import {IssueInterface} from '../../../core/entities/issue/interface';
import {Issue} from '../../../core/entities/issue/model';
import {IssueMapper} from '../../../core/entities/issue/mapper';
import {ErrorResponseInterface} from '@/core/services/request';
import {ImageSquare} from '../../../store/modules/screen';
import {Watch} from 'vue-property-decorator';
import {DynamicFieldInterface} from '../form-generator/fields/dynamic-fields-list/dynamic-fields-list.component';
import {User} from '@/core/entities/user/model';
import NotificationConfig from '../../../core/config/notification-config';
import {ISSUES_ACTIONS} from '../../../store/modules/issues';

export interface BugReportModel {
    description: string;
    errors: DynamicFieldInterface[];
}

@Component({})
export default class BugReportToolComponent extends Vue {
    public formError: string = '';
    public count: number = 0;
    public loading: boolean = false;
    public schema?: Schema;
    public model: BugReportModel = {
        description: '',
        errors: [],
    };

    get screenHistorySquares(): ImageSquare[] {
        return this.$store.getters.getScreenHistorySquares;
    }

    get taskUrl(): string {
        return this.$store.getters.getTaskUrl;
    }

    get client(): User | undefined {
        return this.$store.getters.getClient;
    }

    @Watch('screenHistorySquares')
    public updateSchema() {
        this.generateSchema();
    }

    public beforeMount() {
        this.generateSchema();
    }

    public generateSchema() {
        const descriptionFields = [
            FORM_FIELDS.description('description', {
                label: 'Описание ошибки',
                placeholder: 'Описание ошибки',
            }),
            FORM_FIELDS.submit(this.submitForm),
        ];

        if (this.screenHistorySquares.length) {
            descriptionFields.unshift(FORM_FIELDS.dynamicFieldList('errors', this.screenHistorySquares.length));
        }

        this.schema = {
            groups: [
                {
                    legend: 'Image',
                    styleClasses: 'form-custom-group image-worker',
                    fields: [
                        FORM_FIELDS.imageWorker(),
                    ],
                },
                {
                    legend: 'Description',
                    styleClasses: 'form-custom-group description',
                    fields: descriptionFields,
                },
            ],
            loading: false,
        } as Schema;

        this.$forceUpdate();
    }

    public submitForm() {
        const canvas: HTMLCanvasElement = document.getElementById('bg-canvas') as HTMLCanvasElement;

        if (!canvas) {
            return;
        }

        this.loading = true;

        canvas.toBlob(async (blob: Blob | null) => {
            try {
                const browser = detect();

                if (!browser || !blob || !this.client) {
                    return;
                }

                const file = new File([blob], 'image.png');

                const data: IssueInterface = {
                    description: this.model.description,
                    image: file,
                    taskUrl: this.taskUrl,
                    user: this.client,
                    meta: {
                        href: window.location.href,
                        viewportHeight: window.innerHeight,
                        viewportWidth: window.innerWidth,
                        scrollX: window.scrollX,
                        scrollY: window.scrollY,
                        browser: browser.name,
                        browserVersion: browser.version,
                        os: browser.os,
                        source: window.navigator.userAgent,
                    },
                };

                if (this.model.errors.length) {
                    const errors: { [key: string]: DynamicFieldInterface } = {};

                    this.model.errors.forEach((error: DynamicFieldInterface) => {
                        errors[error.index.toString()] = error;
                    });

                    data.errors = errors;
                }

                const model = new Issue(data);
                const mapper = new IssueMapper();
                await mapper.create(model);

                await this.$store.dispatch(ISSUES_ACTIONS.loadIssues);

                const description = this.model.description ? `"${this.model.description.trim()}" ` : '';
                this.$notify(NotificationConfig.getSuccessConfig(`Правка ${description}была успешно сохранена!`));

                this.$modal.hide('bug-report-tool');
                this.loading = false;
            } catch (exception) {
                this.$notify(NotificationConfig.getErrorsConfig(exception.message));
                this.loading = false;
            }
        });
    }
}
