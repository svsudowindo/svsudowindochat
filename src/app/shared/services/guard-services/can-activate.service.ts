import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { LocalStorageEnums } from '../../constants/localstorage-enums';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService {
  constructor(
    private router: Router,
    private storageService: StorageService) { }

  // Decide's weather the route need to be activated or not by returinging true or false
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tokenExist = this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN);
    if (tokenExist !== undefined && tokenExist !== null && tokenExist !== '') {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
