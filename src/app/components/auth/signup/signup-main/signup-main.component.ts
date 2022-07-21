import { Component, OnInit } from '@angular/core';
import { DetectDeviceService } from 'src/app/utils/detect-device.service';

@Component({
  selector: 'app-signup-main',
  templateUrl: './signup-main.component.html',
  styleUrls: ['./signup-main.component.scss']
})
export class SignupMainComponent implements OnInit {

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
