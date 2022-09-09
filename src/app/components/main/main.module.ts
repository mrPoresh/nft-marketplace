import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { AssetPageComponent } from './asset-page/asset-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AssetPageComponent,
    CollectionPageComponent,
    ExploreCollectionsComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedComponentsModule,
    SharedMaterialModule,
  ]
})
export class MainModule { }
