export class EditDiscountServiceListDomain {
    id: number;
    position: number;
    name: string;
    note: string;
    banner: string;
    startDate: string;
    endDate: string;
    status: string;
    numberService: number;

    constructor(id: number,
        position: number,
        name: string,
        note: string,
        banner: string,
        startDate: string,
        endDate: string,
        status: string,
        numberService: number) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.banner = banner;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.numberService = numberService;
        this.note = note;
    }

}