import Vue from 'vue';
import Component from 'vue-class-component';
import {FORM_FIELDS} from '@/application/components/form-generator/settings/fields';
import {Watch} from 'vue-property-decorator';
import {SchemaGroup, Schema, SchemaDefaultField} from '../settings/interfaces';

@Component({
    props: {
        schema: Object,
        model: Object,
        formOptions: {
            type: Object,
            default: () => {
                return FORM_FIELDS.options();
            },
        },
        formError: {
            type: String,
            default: '',
        },
    },
    computed: {
        formSchema() {
            const schema = Object.assign({}, this.$props.schema) as Schema;

            // let removeButtonField = (fields: SchemaDefaultField[]) => {
            //
            // };
            //
            // let fields: SchemaDefaultField[] = [];
            // if (schema.groups) {
            //     fields = <SchemaDefaultField[]>schema.groups.map((group: SchemaGroup) => group.fields);
            // } else {
            //     fields = schema.fields || [];
            // }
            //
            // const button = fields.find((field: any) => {
            //     return field.type === 'submit';
            // });
            //
            // if (button) {
            //     this.$data.button = button;
            //
            //     fields.filter((field: any) => {
            //         return field.type !== 'submit';
            //     });
            // }
            //
            // if (fields) {
            //     fields.push(<SchemaDefaultField>{
            //         type: 'submit',
            //         buttonText: 'Submit',
            //         validateBeforeSubmit: true,
            //     });
            // }

            return schema;
        },
    },
})
export default class FormBuilderComponent extends Vue {

    @Watch('$props.formError')
    public formErrorChange() {
        this.$data.isTouched = false;
    }

    public data() {
        return {
            button: null,
            isTouched: false,
        };
    }

    public submit() {
        // @ts-ignore
        if (this.$refs.form.validate()) {
            this.$data.isTouched = false;
            this.$data.button.submit();
        }
    }
}

