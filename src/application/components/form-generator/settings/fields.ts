import {SchemaDefaultField, SchemaOptions, SchemaErrorList} from './interfaces';
import {validators} from 'vue-form-generator';

export const FORM_FIELDS = {
    options: (options?: object): SchemaOptions => {
        return Object.assign({
            validateAfterLoad: false,
            validateAfterChanged: true,
        }, options);
    },
    description: (model: string = 'description', properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            type: 'textArea',
            model,
        }, properties);
    },
    submit: (submit: () => void, properties: object = {}) => {
        return Object.assign({
            type: 'submit',
            buttonText: 'Отправить',
            validateBeforeSubmit: true,
            onSubmit: submit,
        }, properties);
    },
    button: (text: string, onClick: () => void, properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            type: 'cbutton',
            text,
            onClick,
            class: 'button__orange',
        }, properties);
    },
    imageWorker: (properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            model: 'image',
            type: 'image-worker',
        }, properties);
    },
    email: (properties: object = {}) => {
        return Object.assign({
            type: 'input',
            inputType: 'text',
            label: 'Email',
            model: 'email',
            placeholder: 'Введи email с которого зарегался в worksection',
            required: true,
            validator: validators.email,
        }, properties);
    },
    taskUrl: (properties: object = {}) => {
        return Object.assign({
            type: 'input',
            inputType: 'text',
            label: 'Ссылка на задачу',
            model: 'url',
            placeholder: 'Скопируй сюда ссылку с worksection',
            required: true,
            validator: validators.url,
        }, properties);
    },
    name: (properties: object = {}) => {
        return Object.assign({
            type: 'input',
            inputType: 'text',
            label: 'Ім\'я',
            model: 'name',
            placeholder: 'Ім\'я',
            required: true,
            min: 2,
            max: 24,
            validator: [validators.string],
        }, properties);
    },
    dynamicFieldList: (model: string, count: number = 0, properties: SchemaDefaultField = {}): SchemaDefaultField => {
        return Object.assign({
            model,
            type: 'dynamic-fields-list',
            text: 'Описание бага',
            count,
        }, properties);
    },
};
