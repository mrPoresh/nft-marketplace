import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends BasePageComponent implements OnInit {

  public navLinks!: any[];
  public activeLinkIndex = -1;

  constructor(private router: Router) { 
    super();

    this.navLinks = [
      {
        label: 'NFTs',
        link: './items',
        index: 0
      }, 
      {
        label: 'Collections',
        link: './collections',
        index: 1
      }
    ];
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
