import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { ToggleMenuBackService } from 'src/app/utils/toggle-menu-back.service';

export enum topMenuAction {
  BACK = 1,
  TOP = 2
}

@Component({
  selector: 'app-slide-menu-button',
  templateUrl: './slide-menu-button.component.html',
  styleUrls: ['./slide-menu-button.component.scss']
})
export class SlideMenuButtonComponent extends BasePageComponent implements OnInit {

  isShowBackButton = false;

  constructor(public toggleBackService: ToggleMenuBackService) { super() }

  @Output() clicked = new EventEmitter<topMenuAction>();

  ngOnInit() {
    this.toggleBackService.attach().pipe(takeUntil(this.unsubscribe)).subscribe((showBack:boolean) => {
      if (showBack){
        this.isShowBackButton = true;
      }
      else{
        this.isShowBackButton = false;
      }
    })
  }

  openMenu(){
    this.clicked.next(topMenuAction.TOP);
    this.toggleBackService.showBack();
  }

  goBack(){
    this.clicked.next(topMenuAction.BACK);
    this.toggleBackService.hideBack();
  }

}
