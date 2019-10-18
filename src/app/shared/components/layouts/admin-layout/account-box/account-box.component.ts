import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent implements OnInit {
  isPopOpen = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['profile']);
    this.isPopOpen = false;
  }

  goToLogin() {
    this.router.navigate(['login']);
    this.isPopOpen = false;
  }

}
