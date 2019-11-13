import { Router } from '@angular/router';
import { StorageService } from './../../../../shared/services/storage.service';
import { SnackbarMessengerService } from './../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { CommonRequestService } from './../../../../shared/services/common-request.service';
import { GENDER } from './personal-details.enums';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Utils from 'src/app/shared/services/common/utils';
import { post } from 'selenium-webdriver/http';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { LocalStorageEnums } from 'src/app/shared/constants/localstorage-enums';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  genderConst = GENDER;
  personalDetailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private snackbarMessengerService: SnackbarMessengerService,
    private storageService: StorageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initPersonalDetailsForm();
  }
  initPersonalDetailsForm() {
    this.personalDetailsForm = this.formBuilder.group({
      fullName: [''],
      gender: [''],
      dateOfBirth: [''],
      emailId: [''],
      phoneNumber: [''],
      employeeId: [''],
      country: [''],
      state: [''],
      city: [''],
      pinCode: [''],
      address: [''],
    });
  }
  personalDetails() {
    this.loaderService.showLoading();
    const postbody = Object.assign({}, this.personalDetailsForm.value);
    if (!Utils.isEmpty(postbody.dateOfBirth)) {
      postbody.dateOfBirth = new Date(postbody.dateOfBirth).getTime();
    }
    let companyID = this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
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
      this.snackbarMessengerService.openSnackBar('Personal Details created successfully', false);

      this.loaderService.hideLoading();
    });

  }
} 
