import { Injectable } from '@angular/core';
import { GlobalVariables } from '../common/globalVariables';
import { GlobalVariableEnums } from '../../constants/gloabal-variable-enums';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage.service';
import { LocalStorageEnums } from '../../constants/localstorage-enums';

@Injectable({
  providedIn: 'root'
})
export class FrameURLService {
  constructor(private storageService: StorageService) { }

  // Return the Exact path to be sent
  public getHttpFramedURL(requestObj: any) {
    const URL = JSON.parse(JSON.stringify(environment.BASE_URL)) + requestObj.path;
    let path = URL.replace('token', this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN));
    if (requestObj.keys.length > 0 && requestObj.values.length > 0) {
      for (let i = 0; i < requestObj.keys.length; i++) {
        // Replaces the word which starts with colon only. which indicates run time value
        path = path.replace(':' + requestObj.keys[i], requestObj.values[i]);
      }
    }
    return path;
  }
}
