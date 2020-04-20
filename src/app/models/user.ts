export class User {
    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;
    public active: boolean;
    public role: any[] = [];
}
