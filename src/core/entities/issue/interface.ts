// tslint:disable-next-line:max-line-length
import {DynamicFieldInterface} from '@/application/components/form-generator/fields/dynamic-fields-list/dynamic-fields-list.component';
import {User} from '../user/model';

export interface IssueMetaInterface {
    href: string;
    viewportHeight: number;
    viewportWidth: number;
    scrollX: number;
    scrollY: number;
    browser: string;
    browserVersion: string | null;
    os: string | null;
    source: string;
}

export interface IssueInterface {
    image: File;
    photo?: string;
    id?: number;
    description: string;
    taskUrl: string;
    user: User;
    errors?: { [key: string]: DynamicFieldInterface };
    meta: IssueMetaInterface;
}
