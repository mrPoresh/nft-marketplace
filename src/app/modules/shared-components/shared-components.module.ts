import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../shared-material.module';
import { CardComponent } from 'src/app/components/base-components/cards/card/card.component';
import { CardsSectionComponent } from 'src/app/components/base-components/cards/cards-section/cards-section.component';
import { CloseDialogButtonComponent } from 'src/app/components/base-components/dialogs/close-dialog-button/close-dialog-button.component';
import { SuccessDialogComponent } from 'src/app/components/base-components/dialogs/success-dialog/success-dialog.component';


@NgModule({
  declarations: [
    CardComponent,
    CardsSectionComponent,
    CloseDialogButtonComponent,
    SuccessDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
  ],
  exports: [
    CardComponent,
    CardsSectionComponent,
    CloseDialogButtonComponent,
    SuccessDialogComponent,
  ]
})
export class SharedComponentsModule { }
