import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    PopupComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class PopupModule { }
