export class User { 
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public active: boolean;
    public tokenActivation: string;
    public confirmed: boolean;
    public tokenRecovery: string;
    public lastLogin: Date;
    public roles?: {
        id?: number;
        name?: string;
    }[];

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
        this.lastLogin = init?.lastLogin ?? new Date();
    }

    public mapToPrimitives() {
        return {
            id: this.id,
            firstName:this.firstName,
            lastName:this.lastName,
            email: this.email,
            password: this.password,
            active: this.active,
            tokenActivation: this.tokenActivation,
            confirmed: this.confirmed,
            tokenRecovery: this.tokenRecovery,            
            lastLogin: this.lastLogin.toISOString(),     
        };
    }
}
