import { Component, OnInit, Input } from '@angular/core';

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

  //public isExtend = false;

  @Input() isExtend!: boolean;
  @Input() isDesktop!: boolean;

  constructor() {}

  ngOnInit() {

  }

}
