import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { SdkLoginService } from '../../rarible-sdk-services/sdk-login.service';
import { LoginStatusService } from '../login/login-status.service';

import { LoggedStatus, UserInfo } from '../login/login.models';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  constructor(
    private loginStatusService: LoginStatusService,
    private sdkLoginService: SdkLoginService,
  ) { }

  requestCheckUserInfo(): Observable<UserInfo> {
    return this.sdkLoginService.connector.connection.pipe(
      switchMap((res: any) => {
        this.loginStatusService.updateUserInfo({
          isLogged: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
          isLoggedWallet: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
          walletAddress: res.status === "connected" ? res.connection.address : undefined,
        });
        return this.loginStatusService.getLoginStatus()
      }),
    );
  }

}
