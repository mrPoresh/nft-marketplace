import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedMaterialModule } from './modules/shared-material.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/base-components/home-page/home-page.component';
import { CardsSectionComponent } from './components/base-components/cards/cards-section/cards-section.component';
import { CardComponent } from './components/base-components/cards/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CardsSectionComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
