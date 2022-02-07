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
        publish_date: string
    ) {
        this.id = id;
        this.position = position;
        this.title = title;
        this.content = content;
        this.type = type;
        this.status = publish_date;
    }
}