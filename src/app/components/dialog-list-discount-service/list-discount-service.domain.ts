export class ListDiscountServiceDomain {
    discount_id: number;
    position: number;
    discount_name: string;
    banner: string;
    percentage: string;
    date_start: string;
    date_end: string;
    status: string;

    constructor(discount_id: number,
        position: number,
        discount_name: string,
        banner: string,
        percentage: string,
        date_start: string,
        date_end: string,
        status: string) {
        this.discount_id = discount_id;
        this.position = position;
        this.discount_name = discount_name;
        this.banner = banner;
        this.percentage = percentage;
        this.date_start = date_start;
        this.date_end = date_end;
        this.status = status;
    }

}