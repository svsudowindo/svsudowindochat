import { Injectable } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private ref: NgbModalRef;
  options: NgbModalOptions = {
    centered: true,
    windowClass: 'dark-modal',
    backdrop: 'static',
    keyboard: false
  };
  constructor(private modalService: NgbModal) {

  }
showLoading() {
  this.ref = this.modalService.open(LoaderComponent, this.options);
}

hideLoading() {
  this.ref.dismiss('clicked here');
}
}
