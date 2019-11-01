import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '../../../shared/services/common/baseClass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VALIDATION_PATTERNS } from '../../../shared/constants/validation-patterns';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { SnackbarMessengerService } from '../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { LoaderService } from '../../../shared/components/componentsAsService/loader/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseClass implements OnInit {
  forgetPasswordForm: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email' }
    ],
    companyID: [
      { type: 'required', message: 'Company ID is required' }
    ]
  };
  constructor(
    public injector: Injector,
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private snackbarMessengerService: SnackbarMessengerService,
    private loaderService: LoaderService) {
    super(injector);
  }

  ngOnInit() {
    this.initForgetPasswordForm();
  }

  // initialize forget password form
  initForgetPasswordForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      companyID: ['', Validators.compose([Validators.required])]
    });
  }

  // field validation
  isValidField(fieldName) {
    // tslint:disable-next-line:max-line-length
    if (this.forgetPasswordForm.get(fieldName).invalid && (this.forgetPasswordForm.get(fieldName).touched || this.forgetPasswordForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }

  requestPassword() {
    this.loaderService.showLoading();
    this.commonRequestService.request(RequestEnums.FORGOT_PASSWORD, this.forgetPasswordForm.value).subscribe(res => {
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
      this.snackbarMessengerService.openSnackBar('Request sent successfully', false);
      this.loaderService.hideLoading();
    }, (error) => {
      this.loaderService.hideLoading();
      this.snackbarMessengerService.openSnackBar(error, true);
    });
  }
}
