import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {ImagePoint, ImageSquare, SCREEN_ACTIONS} from '@/store/modules/screen';

@Component({})
export default class CanvasModuleComponent extends Vue {
    public context?: CanvasRenderingContext2D;
    public figureCount: number = 0;

    get screenWidth(): number {
        return this.$store.getters.getScreenWidth;
    }

    get screenHeight(): number {
        return this.$store.getters.getScreenHeight;
    }

    get screenSrc(): string {
        return this.$store.getters.getScreenSrc;
    }

    get screenPoints(): ImagePoint[] {
        return this.$store.getters.getScreenPoints;
    }

    get screenSquares(): ImageSquare[] {
        return this.$store.getters.getScreenSquares;
    }

    @Watch('screenSrc')
    public updateImageSrc() {
        this.setImageToCanvas();
    }

    @Watch('screenSquares')
    public updateScreenSquares(squares: ImageSquare[]) {
        if (!squares.length) {
            return;
        }

        squares.forEach((square: ImageSquare, index: number) => {
            if (!this.context) {
                return;
            }

            // drow border and rect
            this.context.beginPath();
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'red';
            this.context.rect(square.beginX - 1, square.beginY - 1, square.width + 2, square.height + 2);
            this.context.fillStyle = 'rgba(255, 0, 0, 0.05)'; // red
            this.context.fillRect(square.beginX, square.beginY, square.width, square.height);
            this.context.stroke();

            // drow number of rect
            const textX = square.width > 0 ? square.beginX : square.beginX + square.width;
            const textY = square.height > 0 ? square.beginY : square.beginY + square.height;
            this.context.font = '18px Arial';
            this.context.fillStyle = 'red';
            this.context.fillText(`${++this.figureCount}.`, textX + 10, textY + 20);
        });

        this.$store.dispatch(SCREEN_ACTIONS.clearSquares);
    }

    @Watch('screenPoints')
    public updateScreenPoints(points: ImagePoint[]) {
        if (!this.context) {
            return;
        }

        if (this.screenPoints.length < 6) {
            const point = this.screenPoints[0];

            if (!point) {
                return;
            }

            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.strokeStyle = 'red';
            this.context.arc(point.x, point.y, this.context.lineWidth / 2, 0, Math.PI * 2, !0);
            this.context.closePath();
            this.context.fill();
            return;
        }

        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'red';
        this.context.moveTo(this.screenPoints[0].x, this.screenPoints[0].y);

        for (let i = 1; i < this.screenPoints.length - 2; i++) {
            const c = (this.screenPoints[i].x + this.screenPoints[i + 1].x) / 2;
            const d = (this.screenPoints[i].y + this.screenPoints[i + 1].y) / 2;

            const cpx = this.screenPoints[i].x;
            const cpy = this.screenPoints[i].y;
            const x = this.screenPoints[i + 1].x;
            const y = this.screenPoints[i + 1].y;

            this.context.quadraticCurveTo(cpx, cpy, c, d);
            this.context.quadraticCurveTo(cpx, cpy, x, y);
        }

        this.context.stroke();
    }

    public mounted() {
        this.setImageToCanvas();
    }

    public setImageToCanvas() {
        // @ts-ignore
        this.context = this.$refs.canvas.getContext('2d');

        const background = new Image();
        background.src = this.screenSrc;

        background.onload = (event) => {
            const imgWidth = this.screenWidth;
            const imgHeight = this.screenHeight;
            const canvas = this.$refs.canvas as HTMLElement;

            if (!canvas || !this.context) {
                return;
            }

            canvas.setAttribute('width', `${imgWidth}px`);
            canvas.setAttribute('height', `${imgHeight}px`);

            this.context.drawImage(background, 0, 0, imgWidth, imgHeight);
        };
    }
}

