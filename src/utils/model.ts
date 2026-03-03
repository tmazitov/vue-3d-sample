export class Model {
    id: number;
    name: string;
    filePath: string;
    comment: string;
    constructor(id: number ,name: string, filePath: string, comment: string) {
        this.id = id;
        this.name = name;
        this.filePath = filePath;
        this.comment = comment;
    }
}