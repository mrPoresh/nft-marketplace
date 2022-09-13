import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';

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

  getState() {
    return this.sdkLoginService.getState().pipe(
      switchMap((res) => {
      if (res) {
        this.sdkLoginService.createConnector();
        return this.sdkLoginService.getConnection().pipe(
          switchMap((res: any) => {
            this.loginStatusService.updateUserInfo({
              isLogged: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
              isLoggedWallet: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
              walletAddress: res.status === "connected" ? res.connection.address : undefined,
            });
            return this.loginStatusService.getLoginStatus()
          }),
        );

      } else {
        this.loginStatusService.updateUserInfo({
          isLogged: LoggedStatus.notLogged,
          isLoggedWallet: LoggedStatus.notLogged,
          walletAddres: undefined,
        });

        return this.loginStatusService.getLoginStatus()
      }
     })
    );
  }

}
