export interface IUser {
    menu: {
        accountLink: string;
        logoutLink: string;
    };
    login: string;
    language: string;
    defaultSystem: any;
    system: Array<string>;
    // TODO : complete the interface
}
