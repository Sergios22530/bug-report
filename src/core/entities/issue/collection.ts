import {Collection} from '@/core/components/collection';
import {Issue} from '@/core/entities/issue/model';
import {IssueInterface} from '@/core/entities/issue/interface';

export class IssueCollection extends Collection {

  protected createModel(data: IssueInterface): Issue {
    return new Issue(data);
  }

}
