export class TaskListDomain {
    id: number;
    position: number;
    user_name: string;
    user_avatar: string;
    address: string;
    type_address: string;
    startDate: string;
    status: string;
    price: number;

    constructor(id: number,
        position: number,
        user_name: string,
        user_avatar: string,
        address: string,
        type_address: string,
        startDate: string,
        price: number,
        status: string,) {

        this.id = id;
        this.position = position;
        this.user_name = user_name;
        this.address = address;
        this.type_address = type_address;
        this.startDate = startDate;
        this.price = price;
        this.status = status;
        this.user_avatar = user_avatar;

    }

}