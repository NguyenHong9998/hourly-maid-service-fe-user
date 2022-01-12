export class HeaderItemDomain {
    index: number;
    name: string;
    isActive: boolean;

    constructor(index: number, name: string, isActive: boolean) {
        this.index = index;
        this.name = name;
        this.isActive = isActive;
    }

    setIsActive(isActive: boolean) {
        this.isActive = isActive;
    }

}