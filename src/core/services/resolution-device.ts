export default class ResolutionDevice {
    private readonly heightResolution: number;
    private readonly lowResolution: number;

    constructor(heightResolution: number, lowResolution: number) {
        this.heightResolution = heightResolution;
        this.lowResolution = lowResolution;
    }

    /**
     * Возврашает true если переданная ширина больше текущего разрешения
     * @param {number} width Any width. User device width by default
     * @returns {boolean}
     */
    public isMore(width = window.innerWidth) {
        return width > this.heightResolution;
    }

    /**
     * Возврашает true если переданная ширина меньше\равно текущего разрешения
     * @param {number} width Any width. User device width by default
     * @returns {boolean}
     */
    public isLess(width = window.innerWidth) {
        return width <= this.lowResolution;
    }

    /**
     * Возврашает true если переданная ширина вписывается в рамки текущего разрешения
     * @param {number} width Any width. User device width by default
     * @returns {boolean}
     */
    public isCurrent(width = window.innerWidth) {
        return width <= this.heightResolution && width > this.lowResolution;
    }
}
