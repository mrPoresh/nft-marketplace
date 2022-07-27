import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { BasePageComponentWithDialogs } from '../base-page/base-page.component';
import { ExploreMenuAction } from './explore-menu/explore-menu-button/explore-menu-button.component';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent extends BasePageComponentWithDialogs implements OnInit {

  @Input() isExtend!: boolean;
  @Input() isLogged!: boolean;
  @Output() closeEvent = new EventEmitter();

  @ViewChild('sidenavDeep') sidenavDeep!: MatSidenav;

  constructor(
    public errorDialog: MatDialog,
  ) { super(errorDialog) }

  ngOnInit() {
    
  }

  menuAction(value: ExploreMenuAction) {
    console.log("Value", value)
    if (value === ExploreMenuAction.TOP) {
      this.sidenavDeep.open();
    }
    else if (value === ExploreMenuAction.BACK) {
      this.sidenavDeep.close();
    }
    
  }

  close() {
    this.sidenavDeep.close();
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
    this.sidenavDeep.close();
    console.log("close event")
  }

}
