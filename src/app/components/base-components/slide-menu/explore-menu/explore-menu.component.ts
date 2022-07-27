import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-explore-menu',
  templateUrl: './explore-menu.component.html',
  styleUrls: ['./explore-menu.component.scss']
})
export class ExploreMenuComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
  }

}
