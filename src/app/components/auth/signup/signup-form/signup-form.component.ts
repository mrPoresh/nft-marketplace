import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent extends BasePageComponent implements OnInit {

  selectedIndex = 0;

  isLinear = false;     /* for skiping steps */

  isCompleted1 = false;
  isCompleted2 = false;
  isCompleted3 = false;

  @Output() closeEvent = new EventEmitter();

  closeDialog(url: string): void {
    this.closeEvent.next(url);
  }

  constructor() {
    super() 
  }

  ngOnInit() {

  }

}
