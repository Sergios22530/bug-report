import Vue from 'vue';
import Component from 'vue-class-component';
import {abstractField} from 'vue-form-generator';
import {Watch} from 'vue-property-decorator';

export interface DynamicFieldInterface {
    value: string;
    index: number;
}

@Component({
    mixins: [abstractField],
})
export default class DynamicFieldsListComponent extends Vue {

    public fields: Array<{ index: number, label: string }> = [];

    @Watch('schema') public countUpdateS() {
        this.getFields();
    }

    public changeValue(value: string, index: number) {
        const newValue: DynamicFieldInterface = {value, index};
        // @ts-ignore
        const allValues: DynamicFieldInterface[] = Object.assign([], this.value);

        const indexOfValue = allValues.findIndex((inputValue: any) => inputValue.index === index);

        if (indexOfValue !== -1) {
            allValues.splice(indexOfValue, 1);
        }
        allValues.push(newValue);


        // @ts-ignore
        this.value = allValues;

        this.$props.model[this.$props.schema.model] = allValues;
    }

    public mounted() {
        this.getFields();
    }

    public getFields() {
        const fields = [];

        for (let i = 0; i < this.$props.schema.count; i++) {
            fields.push({
                index: i,
                label: `${this.$props.schema.text} №${i + 1}`,
            });
        }

        this.fields = fields;
    }
}

