import { Component, OnInit } from '@angular/core';

import { DetectDeviceService } from 'src/app/utils/detect-device.service';

@Component({
  selector: 'app-connect-wallet-main',
  templateUrl: './connect-wallet-main.component.html',
  styleUrls: ['./connect-wallet-main.component.scss']
})
export class ConnectWalletMainComponent implements OnInit {

  public isExtend = false;
  public isDesktop = false;

  constructor(
    public detectDeviceService: DetectDeviceService,
  ) { }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

  }

}
