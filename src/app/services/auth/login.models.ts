export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
    changePassword = 2
}

export interface UserInfo {
    isLogged: LoggedStatus;
    //username?: string;
    //language?: string;
    //currency?: string;
    //fullInfo?: UserInfoResponse;
    isLoggedFirebase?: LoggedStatus;
    isLoggedMetamask?: LoggedStatus;
}