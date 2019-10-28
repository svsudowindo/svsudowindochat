import { Component, Injector, OnInit, Input } from '@angular/core';
import { BaseClass } from '../../../../shared/services/common/baseClass';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../../../shared/services/common/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseClass implements OnInit {

  resetpasswordForm: FormGroup;
  @Input() newPassword = '';

  validationMessages = {
    currentPassword: [
      { type: 'required', message: 'Current Password required' }
    ],
    newPassword: [
      { type: 'required', message: 'Enter New Password' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm New Password' },
      { type: 'passwordMismatch', message: 'New password and confirm password should be same' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initResetPasswordForm();
  }
  initResetPasswordForm() {
    this.resetpasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
        validator: CustomValidators.passwordsMatch
      });
  }

  // field validation
  isValidField(fieldName) {
    if (this.resetpasswordForm.get(fieldName).invalid && (this.resetpasswordForm.get(fieldName).touched || this.resetpasswordForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
}
