export class EmployeeInforDomain {
    id: number;
    name: string;
    email: string;
    avatar: string;

    constructor(name: string, id: number, email: string, avatar: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }

}