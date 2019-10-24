import {Model} from '@/core/components/model';
import {IssueInterface} from '@/core/entities/issue/interface';
import {IssueMetaInterface} from './interface';
// tslint:disable-next-line:max-line-length
import {DynamicFieldInterface} from '@/application/components/form-generator/fields/dynamic-fields-list/dynamic-fields-list.component';
import {User} from '../user/model';

export class Issue extends Model implements IssueInterface {
    public image: File;
    public description: string;
    public photo?: string;
    public taskUrl: string;
    public id?: number;
    public user: User;
    public errors?: { [key: string]: DynamicFieldInterface };
    public meta: IssueMetaInterface;

    constructor(data: IssueInterface) {
        super();

        this.meta = data.meta;
        this.image = data.image;
        this.taskUrl = data.taskUrl;
        this.user = data.user;
        this.description = data.description;

        if (data.errors) {
            this.errors = data.errors;
        }

        if (data.id) {
            this.id = data.id;
        }

        if (data.photo) {
            this.photo = data.photo;
        }
    }
}
