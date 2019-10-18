import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent implements OnInit {
  isPopOpen = false;
  constructor() { }

  ngOnInit() {
  }

}
