export class NotifyEntity {
    id: number;
    title: string;
    content: string;
    type: number;

    constructor(id: number,
        title: string,
        content: string,
        type: number
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.type = type;
    }
}