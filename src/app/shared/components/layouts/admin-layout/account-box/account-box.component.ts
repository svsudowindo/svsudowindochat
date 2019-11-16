import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageEnums } from '../../../../constants/localstorage-enums';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent implements OnInit {
  isPopOpen = false;
  name: any;
  id: any;
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.name = this.storageService.getLocalStorageItem(LocalStorageEnums.employeeName);
    this.id = this.storageService.getLocalStorageItem(LocalStorageEnums.employeeID);
  }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['profile']);
    this.isPopOpen = false;
  }

  goToLogin() {
    this.router.navigate(['login']);
    this.storageService.deleteLocalStorageItem([LocalStorageEnums.TOKEN, LocalStorageEnums.ROLE, LocalStorageEnums.COMPANY_ID]);
    this.isPopOpen = false;
  }

}
