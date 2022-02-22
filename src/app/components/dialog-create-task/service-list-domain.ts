export class ListSelectServiceTaskDomain {
    id: number;
    name: string;
    banner: string;
    isSelect: boolean;
    price : string;

    constructor(id: number,
        name: string,
        banner: string,
        isSelect: boolean, price : string) {
        this.id = id;
        this.name = name;
        this.banner = banner;
        this.isSelect = isSelect;
        this.price = price;
    }

}