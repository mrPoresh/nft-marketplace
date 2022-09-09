import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AssetPageComponent } from './asset-page/asset-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explore-collections', component: ExploreCollectionsComponent },
  { path: 'collection/:name/:address', component: CollectionPageComponent },
  { path: 'token/:id', component: AssetPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
