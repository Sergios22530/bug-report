import {Model} from '@/core/components/model';
import {UserInterface} from './interface';

export class User extends Model implements UserInterface {

    public id: number;
    public email: string;
    public avatar: string;
    public company: string;
    public department: string;
    public firstName: string;
    public lastName: string;
    public name: string;
    public post: string;

    constructor(data: UserInterface) {
        super();

        this.id = data.id;
        this.email = data.email;
        this.avatar = data.avatar;
        this.company = data.company;
        this.department = data.department;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.name = data.name;
        this.post = data.post;
    }
}
