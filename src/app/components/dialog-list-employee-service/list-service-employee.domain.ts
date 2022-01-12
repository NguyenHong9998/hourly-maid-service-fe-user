export class ListServiceEmployeeListDomain {
    employee_id: number;
    position: number;
    employee_name: string;
    employee_avatar: string;
    level: number;

    constructor(id: number, position: number, employee_name: string, emplyee_avatar: string, level: number) {
        this.employee_id = id;
        this.position = position;
        this.employee_name = employee_name;
        this.employee_avatar = emplyee_avatar;
        this.level = level;
    }

}