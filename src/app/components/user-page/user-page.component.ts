import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';

import { BasePageComponent } from '../base-components/base-page/base-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends BasePageComponent implements OnInit {

  cols;

  public address!: string;
  public isOwner: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public sdk: SDKMain,
    public loginStatusService: LoginStatusService,
  ) {
    super()

    this.address = this.route.snapshot.params['id'];

  }

  ngOnInit() {
    if (window.innerWidth > 600) {
      this.cols = 2;
    } else {
      this.cols = 1;
    }

    window.addEventListener('resize', (event) => {
      const w = event.target as Window; 

      if (w.innerWidth > 600) {
        this.cols = 2;
      } else {
        this.cols = 1;
      }

    });

    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res.walletAddress == this.address) {
        this.isOwner = true;
      }
    });


    this.sdk.getItemsByOwner('ETHEREUM:' + this.address).pipe(takeUntil(this.unsubscribe)).subscribe((res) => console.log("Items Owned", res));
    this.sdk.getItemsByCreator('ETHEREUM:' + this.address).pipe(takeUntil(this.unsubscribe)).subscribe((res) => console.log("Items Created", res));
    this.sdk.getSellOrdersByMaker('ETHEREUM:' + this.address).pipe(takeUntil(this.unsubscribe)).subscribe((res) => console.log("Items on sale", res));
    
  }

}
