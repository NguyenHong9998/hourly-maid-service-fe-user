export class ListEmployeeCreateTaskDomain {
    id: number;
    name: string;
    avatar: string;
    isSelect: boolean;

    constructor(id: number,
        name: string,
        banner: string,
        isSelect: boolean) {
        this.id = id;
        this.name = name;
        this.avatar = banner;
        this.isSelect = isSelect;
    }

}