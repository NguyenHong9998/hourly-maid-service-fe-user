export class EditServiceDomain {
    id: number;
    name: string;
    banner: string;
    price: string;
    note: string;

    constructor(id: number, name: string, banner: string, price: string, note: string) {
        this.id = id;
        this.name = name;
        this.banner = banner;
        this.price = price;
        this.note = note;
    }

}