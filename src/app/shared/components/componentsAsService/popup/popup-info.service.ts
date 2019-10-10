import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export interface IDataInfo {
  type?: string;
  title?: string;
  message?: string;
  okButtonLabel?: string;
  // any other data if needed
}
@Injectable({
  providedIn: 'root'
})
export class PopupInfoService {

  data: IDataInfo;
  modalRef: NgbModalRef;
  constructor() { }
}
