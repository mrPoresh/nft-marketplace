import { Component, OnInit } from '@angular/core';

import { BasePageComponent } from '../base-components/base-page/base-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends BasePageComponent implements OnInit {

  cols;
  /* rowHeight; */

  /* itemsHeight = '2.5'; */

  constructor(

  ) {
    super()
  }

  ngOnInit() {
    if (window.innerWidth > 600) {
      this.cols = 2;
    } else {
      this.cols = 1;
      /* this.rowHeight = '3:2'; */
    }

    window.addEventListener('resize', (event) => {
      const w = event.target as Window; 

      if (w.innerWidth > 600) {
        this.cols = 2;
        /* this.rowHeight = '1:1'; */
      } else {
        this.cols = 1;
        /* this.rowHeight = '3:2'; */
      }

    });
  }

}
