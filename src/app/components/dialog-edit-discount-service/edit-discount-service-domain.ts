export class EditDiscountServiceDomain {
    id: number;
    name: string;
    banner: string;
    isSelect: boolean;
    percent: number;

    constructor(id: number,
        name: string,
        banner: string,
        isSelect: boolean,
        percent: number) {
        this.id = id;
        this.name = name;
        this.banner = banner;
        this.isSelect = isSelect;
        this.percent = percent;
    }

}