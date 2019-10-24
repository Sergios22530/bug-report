import {Model} from '@/core/components/model';

export abstract class Collection {

    protected entities: Model[] = [];

    public setEntity(entity: object): void {
        if (!entity) {
            return;
        }

        this.entities.push(this.createModel(entity));
    }

    public setEntities(entities: object[]): void {
        if (typeof entities === 'object') {
            entities = Object.values(entities);
        }

        this.entities = entities.map((entity: object) => {
            if (!entity) {
                return false;
            }

            return this.createModel(entity);
        }).filter((model: Model | false) => !!model);
    }

    public isEmpty() {
        return !this.entities.length;
    }

    public getEntities(): Model[] {
        return this.entities;
    }

    protected abstract createModel(data: object): Model;
}
