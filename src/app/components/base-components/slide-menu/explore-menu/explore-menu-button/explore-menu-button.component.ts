import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';

import { MenuControl, ToggleMenuBackService } from 'src/app/utils/toggle-menu-back.service';
import { BasePageComponent } from '../../../base-page/base-page.component';

export enum ExploreMenuAction {
  BACK = 1,
  TOP = 2
}

@Component({
  selector: 'app-explore-menu-button',
  templateUrl: './explore-menu-button.component.html',
  styleUrls: ['./explore-menu-button.component.scss']
})
export class ExploreMenuButtonComponent extends BasePageComponent implements OnInit {

  isShowBackButton = false;

  constructor(public toggleBackService: ToggleMenuBackService) { super() }

  @Output() clicked = new EventEmitter<ExploreMenuAction>();

  ngOnInit() {
    this.toggleBackService.attach().pipe(takeUntil(this.unsubscribe)).subscribe((showBack: MenuControl) => {
      if (showBack.exploreMenu) {
        this.isShowBackButton = true;
      } else {
        this.isShowBackButton = false;
      }
    })
  }

  openMenu() {
    this.clicked.next(ExploreMenuAction.TOP);
    this.toggleBackService.showAll();
  }

  goBack() {
    this.clicked.next(ExploreMenuAction.BACK);
    this.toggleBackService.showMain();
  }

}
