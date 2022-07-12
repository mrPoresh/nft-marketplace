import { Component, OnInit, Input } from '@angular/core';

import { DetectDeviceService } from 'src/app/utils/detect-device.service';

export interface Section {
  tag: string,
  images: string[]
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  sections: Section[] = [
    { tag: 'New', images: 
     ['assets/test/image.png', 'assets/test/image.png', 'assets/test/image.png', 
      'assets/test/image.png', 'assets/test/image.png', 'assets/test/image.png'] 
    },
    { tag: 'Top', images: 
     ['assets/test/image.png', 
      'assets/test/image.png', 'assets/test/image.png', 'assets/test/image.png', 
      'assets/test/image.png', 'assets/test/image.png'] 
    },
    { tag: 'Art', images: 
     ['assets/test/image.png', 'assets/test/image.png', 'assets/test/image.png', 
      'assets/test/image.png', 'assets/test/image.png', 'assets/test/image.png'] 
    },
  ];

  public isExtend = false;
  public isDesktop = false;

  constructor(
    public detectDeviceService: DetectDeviceService,
  ) {}

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();
  }

}
