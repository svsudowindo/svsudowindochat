import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup.component';
import { PopupInfoService, IDataInfo } from './popup-info.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  modalRef: NgbModalRef;
  constructor(private _modalService: NgbModal, private _popupinfoService: PopupInfoService) { }

  openModal(
    inputData?: IDataInfo,
    backdropInput = true,
    keyboardInput = true,
    sizeInput: any = 'lg',
    centeredInput: boolean = false) {
      this._popupinfoService.data = inputData;

    this._popupinfoService.modalRef = this._modalService.open(PopupComponent, {
      backdrop: backdropInput,
      keyboard: keyboardInput,
      size: sizeInput,
      centered: centeredInput
    });
    console.log(inputData);
    return this._popupinfoService.modalRef.result;
  }
}
