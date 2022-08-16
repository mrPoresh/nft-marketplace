import { Component, OnInit } from '@angular/core';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';
import { DetectDeviceService } from 'src/app/utils/detect-device.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent implements OnInit {

  isDesktop = false;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public loginSDK: SdkLoginService,
  ) { }

  ngOnInit() {
    this.isDesktop = this.detectDeviceService.isDesktop();
  }

  async connectMetamask() {
    await this.loginSDK.loginWithMetamask()
  }

}
