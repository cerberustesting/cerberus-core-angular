export interface User {
    menu: {
        accountLink: string;
        logoutLink: string;
    };
    login: string;
    language: string;
    defaultSystem: any;
    system: Array<string>;
    group: Array<string>;
    userPreferences: any;
    // TODO : complete the interface
}
