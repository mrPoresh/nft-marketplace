import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BasePageComponentWithDialogs } from '../base-page/base-page.component';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent extends BasePageComponentWithDialogs implements OnInit {

  @Input() isExtend!: boolean;
  @Input() isLogged!: boolean;
  @Output() closeEvent = new EventEmitter();

  constructor(
    public errorDialog: MatDialog,
  ) { super(errorDialog) }

  ngOnInit() {

  }

  callLinkClickedParent() {
    this.closeEvent.next("");
  }

}
