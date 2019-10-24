import {Mapper} from '@/core/components/mapper';
import Request from '@/core/services/request';
import {User} from './model';
import {UserInterface} from './interface';
import {UserCollection} from './collection';

export class UserMapper extends Mapper {

    protected action = 'user';

    protected createModel(data: UserInterface): User {
        return new User(data);
    }

    protected createCollection(data: UserInterface[]): UserCollection {
        const collection: UserCollection = new UserCollection();
        collection.setEntities(data);

        return collection;
    }
}
