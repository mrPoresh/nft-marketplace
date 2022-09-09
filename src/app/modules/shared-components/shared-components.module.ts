import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../shared-material.module';
import { CardComponent } from 'src/app/components/base-components/cards/card/card.component';
import { CardsSectionComponent } from 'src/app/components/base-components/cards/cards-section/cards-section.component';


@NgModule({
  declarations: [
    CardComponent,
    CardsSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
  ],
  exports: [
    CardComponent,
    CardsSectionComponent,
  ]
})
export class SharedComponentsModule { }
