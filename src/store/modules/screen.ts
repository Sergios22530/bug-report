import {ActionContext} from 'vuex';

export const SCREEN_MUTATIONS = {
    setSrc: 'setScreenSrc',
    setWidth: 'setScreenWidth',
    setHeight: 'setScreenHeight',
    setPoints: 'setScreenPoints',
    setSquares: 'setScreenSquares',
    setInitState: 'setScreenInitState',
    setActiveTool: 'setScreenActiveTool',
    setHistoryPoints: 'setScreenHistoryPoints',
    setHistorySquares: 'setScreenHistorySquares',
};

export const SCREEN_ACTIONS = {
    setSrc: 'setScreenSrc',
    addPoint: 'addScreenPoint',
    addSquare: 'addScreenSquare',
    clearPoints: 'clearScreenPoints',
    clearSquares: 'clearScreenSquares',
    clearHistoryPoints: 'clearScreenHistoryPoints',
    clearHistorySquares: 'clearScreenHistorySquares',
};

export interface ImageState {
    src: string;
    width: number;
    height: number;
}

export interface ImagePoint {
    x: number;
    y: number;
}

export interface ImageSquare {
    beginX: number;
    beginY: number;
    width: number;
    height: number;
}

export enum ScreenTools {
    circle,
    square,
    pencil,
}

export interface ScreenState extends ImageState {
    points: ImagePoint[];
    squares: ImageSquare[];
    activeTool: ScreenTools;
    historyPoints: ImagePoint[];
    historySquares: ImageSquare[];
}

const state: ScreenState = {
    src: '',
    width: 0,
    height: 0,
    points: [],
    squares: [],
    historyPoints: [],
    historySquares: [],
    activeTool: ScreenTools.pencil,
};

export default {
    state,
    mutations: {
        [SCREEN_MUTATIONS.setWidth]: (screenState: ScreenState, width: number) => {
            screenState.width = width;
        },
        [SCREEN_MUTATIONS.setInitState]: (screenState: ScreenState, initState: ScreenState) => {
            Object.assign(screenState, initState);
        },
        [SCREEN_MUTATIONS.setHeight]: (screenState: ScreenState, height: number) => {
            screenState.height = height;
        },
        [SCREEN_MUTATIONS.setSrc]: (screenState: ScreenState, src: string) => {
            screenState.src = src;
        },
        [SCREEN_MUTATIONS.setPoints]: (screenState: ScreenState, points: ImagePoint[]) => {
            screenState.points = points;
        },
        [SCREEN_MUTATIONS.setSquares]: (screenState: ScreenState, squares: ImageSquare[]) => {
            screenState.squares = squares;
        },
        [SCREEN_MUTATIONS.setHistorySquares]: (screenState: ScreenState, squares: ImageSquare[]) => {
            screenState.historySquares = squares;
        },
        [SCREEN_MUTATIONS.setHistoryPoints]: (screenState: ScreenState, points: ImagePoint[]) => {
            screenState.historyPoints = points;
        },
        [SCREEN_MUTATIONS.setActiveTool]: (screenState: ScreenState, tool: ScreenTools) => {
            screenState.activeTool = tool;
        },
    },
    getters: {
        getScreenSrc: (screenState: ScreenState): string => screenState.src,
        getScreenWidth: (screenState: ScreenState): number => screenState.width,
        getScreenHeight: (screenState: ScreenState): number => screenState.height,
        getScreenPoints: (screenState: ScreenState): ImagePoint[] => screenState.points,
        getScreenSquares: (screenState: ScreenState): ImageSquare[] => screenState.squares,
        getScreenActiveTool: (screenState: ScreenState): ScreenTools => screenState.activeTool,
        getScreenHistoryPoints: (screenState: ScreenState): ImagePoint[] => screenState.historyPoints,
        getScreenHistorySquares: (screenState: ScreenState): ImageSquare[] => screenState.historySquares,
    },
    actions: {
        [SCREEN_ACTIONS.addPoint]: (context: ActionContext<ScreenState, any>, point: ImagePoint): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                const points = context.state.points.concat([point]);
                context.commit(SCREEN_MUTATIONS.setPoints, points);

                const historyPoints = context.state.historyPoints.concat([point]);
                context.commit(SCREEN_MUTATIONS.setHistoryPoints, historyPoints);

                resolve();
            });
        },
        [SCREEN_ACTIONS.setSrc]: (context: ActionContext<ScreenState, any>, src: string): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                context.commit(SCREEN_MUTATIONS.setSrc, src);

                Promise.all([
                    context.dispatch(SCREEN_ACTIONS.clearPoints),
                    context.dispatch(SCREEN_ACTIONS.clearSquares),
                    context.dispatch(SCREEN_ACTIONS.clearHistoryPoints),
                    context.dispatch(SCREEN_ACTIONS.clearHistorySquares),
                ]).then(() => {
                    resolve();
                });
            });
        },
        [SCREEN_ACTIONS.addSquare]: (context: ActionContext<ScreenState, any>, square: ImageSquare): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                const squares = context.state.squares.concat([square]);
                context.commit(SCREEN_MUTATIONS.setSquares, squares);

                const historySquares = context.state.historySquares.concat([square]);
                context.commit(SCREEN_MUTATIONS.setHistorySquares, historySquares);

                resolve();
            });
        },
        [SCREEN_ACTIONS.clearPoints]: (context: ActionContext<ScreenState, any>): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                context.commit(SCREEN_MUTATIONS.setPoints, []);
                resolve();
            });
        },
        [SCREEN_ACTIONS.clearSquares]: (context: ActionContext<ScreenState, any>): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                context.commit(SCREEN_MUTATIONS.setSquares, []);
                resolve();
            });
        },
        [SCREEN_ACTIONS.clearHistoryPoints]: (context: ActionContext<ScreenState, any>): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                context.commit(SCREEN_MUTATIONS.setHistoryPoints, []);
                resolve();
            });
        },
        [SCREEN_ACTIONS.clearHistorySquares]: (context: ActionContext<ScreenState, any>): Promise<any> => {
            return new Promise((resolve: () => void): void => {
                context.commit(SCREEN_MUTATIONS.setHistorySquares, []);
                resolve();
            });
        },
    },
};
