export class TaskListDomain {
    id: number;
    userName: string;
    userAvatar: string;
    address: string;
    workDate: string;
    startTime: string;
    endTime: string;
    status : string;

    constructor(id: number,
        userName: string,
        userAvatar: string,
        address: string,
        workDate: string,
        startTime: string,
        endTime: string,
        status : string) {
        this.id = id;
        this.userAvatar = userAvatar;
        this.userName = userName;
        this.address = address;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

}