import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseClass } from './../../../shared/services/common/baseClass';
import { RequestEnums } from '../../../shared/constants/request-enums';
import Utils from './../../../shared/services/common/utils';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { PopupService } from '../../../shared/components/componentsAsService/popup/popup.service';
import { POPUP } from '../../../shared/constants/popup-enum';
import { IDataInfo } from '../../../shared/components/componentsAsService/popup/popup-info.service';
import { LoaderService } from '../../../shared/components/componentsAsService/loader/loader.service';
import { GlobalVariables } from '../../../shared/services/common/globalVariables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VALIDATION_PATTERNS } from '../../../shared/constants/validation-patterns';
import { errors } from '../../../shared/constants/errors';
import { StorageService } from '../../../shared/services/storage.service';
import { LocalStorageEnums } from '../../../shared/constants/localstorage-enums';
import { SnackbarMessengerService } from '../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { CanActivateService } from '../../../shared/services/guard-services/can-activate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseClass implements OnInit {
  loginForm: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ],
    companyID: [
      { type: 'required', message: 'Company ID is required' }
    ]
  };
  constructor(
    public route: Router,
    public injector: Injector,
    private commonRequest: CommonRequestService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private snackbarMessengerService: SnackbarMessengerService,
    private canActivateService: CanActivateService) {
    super(injector);
  }

  ngOnInit() {
    this.initLoginForm();
  }
  // initialize login form
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      password: ['', Validators.compose([Validators.required])],
      companyID: ['', Validators.compose([Validators.required])]
    });
  }

  // field validation
  isValidField(fieldName) {
    if (this.loginForm.get(fieldName).invalid && (this.loginForm.get(fieldName).touched || this.loginForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
  // login service call
  login() {
    this.loaderService.showLoading();
    // return;
    this.commonRequest.request(RequestEnums.LOGIN, this.loginForm.value).subscribe(res => {
      if (res.errors.length > 0) {
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
        // error message
        return;
      }
      if (res.status === 200 && res.data) {
        this.loaderService.hideLoading();
        this.storageService.setLocalStorageItem(LocalStorageEnums.TOKEN, res.data._id);
        this.storageService.setLocalStorageItem(LocalStorageEnums.ROLE, res.data.role);
        this.storageService.setLocalStorageItem(LocalStorageEnums.COMPANY_ID, res.data.companyID);
        this.storageService.setLocalStorageItem(LocalStorageEnums.employeeID, res.data.id);
        this.storageService.setLocalStorageItem(LocalStorageEnums.employeeName, res.data.name);
        this.route.navigate(['dashboard']);
      }
    });
  }
}
