import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarMessengerComponent } from './snackbar-messenger.component';

@NgModule({
  declarations: [SnackbarMessengerComponent],
  imports: [
  CommonModule
  ],
  entryComponents: [SnackbarMessengerComponent]
})
export class SnackbarMessengerModule { }
