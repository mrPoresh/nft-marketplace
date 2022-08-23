import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedMaterialModule } from './modules/shared-material.module';

import { WindowProviderService } from './utils/window-provider.service';  /*  */
/* import { SDKMain } from './services/rarible-sdk-services/sdk-main.service'; */

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base-components/base/base.component';
import { BasePageComponent, BasePageComponentWithDialogs } from './components/base-components/base-page/base-page.component';
import { CloseDialogButtonComponent } from './components/base-components/dialogs/close-dialog-button/close-dialog-button.component';
import { ConfirmDialogComponent } from './components/base-components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/base-components/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/base-components/dialogs/success-dialog/success-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CardsSectionComponent } from './components/base-components/cards/cards-section/cards-section.component';
import { CardComponent } from './components/base-components/cards/card/card.component';
import { SlideMenuComponent } from './components/base-components/slide-menu/slide-menu.component';
import { SlideMenuButtonComponent } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { ExploreMenuComponent } from './components/base-components/slide-menu/explore-menu/explore-menu.component';
import { ExploreMenuButtonComponent } from './components/base-components/slide-menu/explore-menu/explore-menu-button/explore-menu-button.component';
import { ExploreCollectionsComponent } from './components/explore-collections/explore-collections.component';
import { CollectionPageComponent } from './components/collection-page/collection-page.component';
import { AssetPageComponent } from './components/asset-page/asset-page.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasePageComponent,
    BasePageComponentWithDialogs,
    CloseDialogButtonComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    HomePageComponent,
    CardsSectionComponent,
    CardComponent,
    SlideMenuComponent,
    SlideMenuButtonComponent,
    ExploreMenuComponent,
    ExploreMenuButtonComponent,
    ExploreCollectionsComponent,
    CollectionPageComponent,
    AssetPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
  ],
  providers: [
    WindowProviderService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
