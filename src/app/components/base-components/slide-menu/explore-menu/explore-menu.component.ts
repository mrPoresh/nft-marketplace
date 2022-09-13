import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-menu',
  templateUrl: './explore-menu.component.html',
  styleUrls: ['./explore-menu.component.scss']
})
export class ExploreMenuComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
  }

  exploreCollections() {
    this.router.navigate(['explore-collections']);
  }

}
