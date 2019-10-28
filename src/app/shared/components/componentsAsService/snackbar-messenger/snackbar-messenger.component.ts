import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar-messenger',
  templateUrl: './snackbar-messenger.component.html',
  styleUrls: ['./snackbar-messenger.component.scss']
})
export class SnackbarMessengerComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
