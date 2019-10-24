import Vue from 'vue';
import Component from 'vue-class-component';
import {abstractField} from 'vue-form-generator';

@Component({
    mixins: [abstractField],
})
export default class ButtonComponent extends Vue {


}

