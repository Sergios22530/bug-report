import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        loading: Boolean,
    },
})
export default class LoaderComponent extends Vue {

}

