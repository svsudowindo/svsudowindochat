import { BaseClass } from './../../../../shared/services/common/baseClass';
import { LocalStorageEnums } from './../../../../shared/constants/localstorage-enums';
import { EncryptDectryptService } from './../../../../shared/services/common/encrypt-decrypt/encrypt-dectrypt.service';
import { Router } from '@angular/router';
import { StorageService } from './../../../../shared/services/storage.service';
import { SnackbarMessengerService } from './../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { CommonRequestService } from './../../../../shared/services/common-request.service';
import { GENDER } from './personal-details.enums';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'src/app/shared/services/common/utils';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from '../../../../shared/constants/validation-patterns';;


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent extends BaseClass implements OnInit {
  genderConst = GENDER;
  personalDetailsForm: FormGroup;
  maxDate = new Date();
  validationMessages = {
    email: [
      { type: 'pattern', message: 'Enter Valid Email' }],
    phone: [
      { type: 'pattern', message: 'Enter Valid Phone Number' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private snackbarMessengerService: SnackbarMessengerService,
    private storageService: StorageService,
    private router: Router,
    private encryptDectryptService: EncryptDectryptService,
    public injector: Injector,

  ) {
    super(injector);
  }


  ngOnInit() {
    this.initPersonalDetailsForm();
    this.setPersonalDetailsForm();
  }
  initPersonalDetailsForm() {
    this.personalDetailsForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      dateOfBirth: [''],
      email: ['', Validators.compose([ Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      phone: ['', Validators.compose([ Validators.pattern(VALIDATION_PATTERNS.PHONE)])],
      country: [''],
      state: [''],
      city: [''],
      pinCode: [''],
      address: [''],
    });
  }

  setPersonalDetailsForm() {
    RequestEnums.GET_PERSONAL_DETAILS_BY_ID.values[0] = this.storageService.getLocalStorageItem('companyID');
    this.commonRequestService.request(RequestEnums.GET_PERSONAL_DETAILS_BY_ID).subscribe(res => {
      if (res.errors.length > 0) {
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
        return;
      }
      if (res.status !== 200 || res.data === undefined || res.data === null) {
        this.snackbarMessengerService.openSnackBar(res.message, true);
        return;
      }
      const payload = Object.assign({}, res.data);
      payload.dateOfBirth = Utils.isNull(payload.dateOfBirth) ? '' : new Date(payload.dateOfBirth);
      this.personalDetailsForm.patchValue(payload);
    });
  }

  // field validation
  isValidField(fieldName) {
    if (this.personalDetailsForm.get(fieldName).invalid && (this.personalDetailsForm.get(fieldName).touched || this.personalDetailsForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
  personalDetails() {
    this.loaderService.showLoading();
    const postbody = Object.assign({}, this.personalDetailsForm.value);
    if (!Utils.isEmpty(postbody.dateOfBirth)) {
      postbody.dateOfBirth = new Date(postbody.dateOfBirth).getTime();
    }
    const companyID = this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    RequestEnums.PERSONAL_DETAILS.values[0] = companyID;
    this.commonRequestService.request(RequestEnums.PERSONAL_DETAILS, postbody).subscribe(res => {

      if (res.errors.length > 0) {
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
        return;
      }
      if (res.status !== 200 || res.data === undefined || res.data === null) {
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.message, true);
        return;
      }
      this.snackbarMessengerService.openSnackBar('Personal Details Updated successfully', false);
      this.loaderService.hideLoading();
    });
  }
}
