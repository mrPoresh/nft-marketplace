import { Component, OnInit } from '@angular/core';
import { DetectDeviceService } from 'src/app/utils/detect-device.service';

@Component({
  selector: 'app-lost-password-main',
  templateUrl: './lost-password-main.component.html',
  styleUrls: ['./lost-password-main.component.scss']
})
export class LostPasswordMainComponent implements OnInit {

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
