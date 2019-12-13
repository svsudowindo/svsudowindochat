import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogRoutingModule } from './confirm-dialog-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    ConfirmDialogRoutingModule,
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule { }
