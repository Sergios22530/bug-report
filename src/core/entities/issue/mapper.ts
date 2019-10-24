import {Mapper} from '@/core/components/mapper';
import {Issue} from '@/core/entities/issue/model';
import {IssueInterface} from '@/core/entities/issue/interface';
import Request from '@/core/services/request';
import {IssueCollection} from '@/core/entities/issue/collection';

export class IssueMapper extends Mapper {

    protected action = 'issue';

    protected createModel(data: IssueInterface): Issue {
        return new Issue(data);
    }

    protected createCollection(data: IssueInterface[]): IssueCollection {
        const collection: IssueCollection = new IssueCollection();
        collection.setEntities(data);

        return collection;
    }
}
