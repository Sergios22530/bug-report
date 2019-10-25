import Vue from 'vue';
import Component from 'vue-class-component';
import {SCREEN_ACTIONS, SCREEN_MUTATIONS} from '@/store/modules/screen';
import html2canvas from 'html2canvas';
import CanvasModuleComponent from './canvas-module/canvas-module.component';
import PointToolComponent from './point-tool/point-tool.component';
import {abstractField} from 'vue-form-generator';
import SquareToolComponent from './square-tool/square-tool.component';

@Component({
    mixins: [abstractField],
    components: {
        'canvas-module': CanvasModuleComponent,
        'point-tool': PointToolComponent,
        'square-tool': SquareToolComponent,
    },
})
export default class ImageWorkerComponent extends Vue {
    public mounted() {
        document.addEventListener('paste', this.getImageFromClipboard);
    }

    public destroy() {
        document.removeEventListener('paste', this.getImageFromClipboard);
    }

    public getImageFromClipboard(event: ClipboardEvent) {
        if (!event || !event.clipboardData) {
            return;
        }

        const items: DataTransferItemList = event.clipboardData.items;
        for (const item of items) {

            // @ts-ignore
            if (item.kind === 'file') {
                // @ts-ignore
                const blob = item.getAsFile();

                this.loadImageFromReader(blob);
            }
        }
    }

    public makeScreen() {
        const element = document.querySelector('body');

        if (!element) {
            return;
        }

        this.$modal.hide('bug-report-tool');

        setTimeout(() => {
            const options = {
                x: window.scrollX,
                y: window.scrollY,
                width: window.innerWidth,
                height: window.innerHeight,
            };

            html2canvas(element, options).then((canvas) => {
                this.$store.commit(SCREEN_MUTATIONS.setWidth, canvas.width);
                this.$store.commit(SCREEN_MUTATIONS.setHeight, canvas.height);

                canvas.toBlob((blob) => {
                    // @ts-ignore
                    const urlCreator = window.URL || window.webkitURL;

                    this.$store.dispatch(SCREEN_ACTIONS.setSrc, urlCreator.createObjectURL(blob));
                    this.$modal.show('bug-report-tool');
                });
            });
        }, 200);
    }

    public loadImageFromReader(file: any) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // @ts-ignore
        reader.onload = (event) => fetch(event.target.result)
            .then((i) => i.blob())
            .then((blob) => {
                // @ts-ignore
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);

                // @ts-ignore
                const _URL = window.URL || window.webkitURL;
                const img = new Image();
                img.onload = (loadedEvent) => {
                    // @ts-ignore
                    const width = loadedEvent.target.width;
                    // @ts-ignore
                    const height = loadedEvent.target.height;

                    this.$store.commit(SCREEN_MUTATIONS.setWidth, width);
                    this.$store.commit(SCREEN_MUTATIONS.setHeight, height);
                    this.$store.dispatch(SCREEN_ACTIONS.setSrc, imageUrl).then();
                };

                img.src = _URL.createObjectURL(file);
            });
    }

    public loadImage(event: any) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        this.loadImageFromReader(file);
    }
}

