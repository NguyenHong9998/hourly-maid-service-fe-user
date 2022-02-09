export class NotifyListDomain {
    id: number;
    position: number;
    title: string;
    content: string;
    type: string;
    status: string;

    constructor(id: number,
        position: number,
        title: string,
        content: string,
        type: string,
        status: string
    ) {
        this.id = id;
        this.position = position;
        this.title = title;
        this.content = content;
        this.type = type;
        this.status = status;
    }
}