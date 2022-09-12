import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent extends BasePageComponent implements OnInit {

  public collection_id!: string;
  public collection_data: any | undefined = undefined;
  public collection_items: any[] | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sdk: SDKMain,
  ) { 
    super();
  
    this.collection_id = this.route.snapshot.params['id'];

  }

  ngOnInit() {
    this.sdk.getCollectionById(this.collection_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.collection_data = res;
    });

    this.sdk.getItemsByCollection(this.collection_id, undefined).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.collection_items = res.items;
      console.log('Items', this.collection_items)
    })
  }

  onClick(data: any) {
    console.log('Choosed nft >>>', data);
    this.router.navigate(['token' + '/' + data.id]);
  }

}
