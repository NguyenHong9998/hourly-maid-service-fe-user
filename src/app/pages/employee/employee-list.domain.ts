export class EmployeeListDomain {
    id: number;
    position: number;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    status: string;
    role: string;

    constructor(position: number, name: string, id: number, email: string, avatar: string, phone: string, status: string, role: string) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.phone = phone;
        this.status = status;
        this.role = role;
    }

}