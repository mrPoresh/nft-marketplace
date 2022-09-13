import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedMaterialModule } from './modules/shared-material.module';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';

import { WindowProviderService } from './utils/window-provider.service';  /*  */
import { SDKMain } from './services/rarible-sdk-services/sdk-main.service';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base-components/base/base.component';
import { BasePageComponent, BasePageComponentWithDialogs } from './components/base-components/base-page/base-page.component';
import { CloseDialogButtonComponent } from './components/base-components/dialogs/close-dialog-button/close-dialog-button.component';
import { ConfirmDialogComponent } from './components/base-components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/base-components/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/base-components/dialogs/success-dialog/success-dialog.component';
import { SlideMenuComponent } from './components/base-components/slide-menu/slide-menu.component';
import { SlideMenuButtonComponent } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { ExploreMenuComponent } from './components/base-components/slide-menu/explore-menu/explore-menu.component';
import { ExploreMenuButtonComponent } from './components/base-components/slide-menu/explore-menu/explore-menu-button/explore-menu-button.component';
import { LoginStatusService } from './services/auth/login/login-status.service';
import { HttpClientModule } from '@angular/common/http';
import { SdkLoginService } from './services/rarible-sdk-services/sdk-login.service';
import { CheckSessionService } from './services/auth/check-session/check-session.service';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasePageComponent,
    BasePageComponentWithDialogs,
/*     CloseDialogButtonComponent, */
/*     ConfirmDialogComponent, */
/*     ErrorDialogComponent, */
/*     SuccessDialogComponent, */
    SlideMenuComponent,
    SlideMenuButtonComponent,
    ExploreMenuComponent,
    ExploreMenuButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    SharedComponentsModule,
    HttpClientModule
  ],
  providers: [
    WindowProviderService,
    LoginStatusService,
    CheckSessionService,
    SDKMain,
    SdkLoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
