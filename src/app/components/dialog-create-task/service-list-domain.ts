export class ListSelectServiceTaskDomain {
    id: number;
    name: string;
    banner: string;
    isSelect: boolean;

    constructor(id: number,
        name: string,
        banner: string,
        isSelect: boolean) {
        this.id = id;
        this.name = name;
        this.banner = banner;
        this.isSelect = isSelect;
    }

}