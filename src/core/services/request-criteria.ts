export enum ORDER_TYPES {
    DESC = 'desc',
    ASC = 'asc',
}

export interface RequestCriteriaInterface {
    perPage?: number;
    expand?: string[];
    page?: number;
    condition?: { [fieldName: string]: any[] | null };
    mixins?: string[];
    order?: {
        field: string;
        type: ORDER_TYPES;
    } | 'random';
    groupBy?: string[];
}

export class RequestCriteria implements RequestCriteriaInterface {
    public perPage?: number;
    public page?: number;
    public expand?: string[];
    public condition?: { [fieldName: string]: Array<number | string | boolean> | null };
    public mixins?: string[];
    public order?: {
        field: string;
        type: ORDER_TYPES;
    } | 'random';
    public groupBy?: string[];

    constructor(data: RequestCriteriaInterface) {
        if (data.perPage) {
            this.perPage = data.perPage;
        }
        if (data.page) {
            this.page = data.page;
        }
        if (data.expand) {
            this.expand = data.expand;
        }
        if (data.condition) {
            this.condition = data.condition;
        }
        if (data.mixins) {
            this.mixins = data.mixins;
        }
        if (data.order) {
            this.order = data.order;
        }
        if (data.groupBy) {
            this.groupBy = data.groupBy;
        }
    }

    public getProps() {
        const props = {};

        if (this.expand) {
            Object.defineProperty(props, 'expand', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.expand.join(','),
            });
        }

        if (this.page) {
            Object.defineProperty(props, 'page', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.page,
            });
        }

        if (this.mixins) {
            Object.defineProperty(props, 'mixins', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.mixins.join(','),
            });
        }

        if (this.groupBy) {
            Object.defineProperty(props, 'groupBy', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.groupBy.join(','),
            });
        }

        if (this.perPage) {
            Object.defineProperty(props, 'perPage', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.perPage,
            });
        }

        if (this.order) {
            let value = '';


            if (this.order === 'random') {
                value = this.order;
            } else {
                const sign = this.order.type === ORDER_TYPES.ASC ? '' : '-';
                value = sign + this.order.field;
            }

            Object.defineProperty(props, 'sort', {
                writable: true,
                enumerable: true,
                configurable: true,
                value,
            });
        }


        if (this.condition && Object.keys(this.condition).length) {
            Object.defineProperty(props, 'filter', {
                writable: true,
                enumerable: true,
                configurable: true,
                value: this.condition,
            });
        }

        return props;
    }
}
