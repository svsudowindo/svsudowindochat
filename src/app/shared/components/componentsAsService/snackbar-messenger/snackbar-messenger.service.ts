import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarMessengerComponent } from './snackbar-messenger.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarMessengerService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(incomingMessage: string, incomingIsError) {
    this.snackBar.openFromComponent(SnackbarMessengerComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
      data: { message: incomingMessage, isError: incomingIsError}
    });
  }
}
