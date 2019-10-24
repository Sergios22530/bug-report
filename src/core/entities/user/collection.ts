import {Collection} from '@/core/components/collection';
import {User} from './model';
import {UserInterface} from './interface';

export class UserCollection extends Collection {

  protected createModel(data: UserInterface): User {
    return new User(data);
  }
}
