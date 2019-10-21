import { Component,Injector, OnInit } from '@angular/core';
import { BaseClass } from '../../../../shared/services/common/baseClass';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseClass implements  OnInit {

  resetpasswordForm: FormGroup;
  validationMessages = {
    currentPassword: [
      { type: 'required', message: 'Current Password required' }
    ],
    newPassword: [
      { type: 'required', message: 'Enter New Password' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm New Password' }
    ]
  };
  constructor(private formBuilder: FormBuilder,
    public injector: Injector) {
    super(injector);
  } 

  ngOnInit() {
    this.initResetPasswordForm();
  }
  initResetPasswordForm() {
 this.resetpasswordForm = this.formBuilder.group({
  currentPassword: ['',Validators.compose([Validators.required])],
  newPassword: ['', Validators.compose([Validators.required])],
  confirmPassword: ['',Validators.compose([Validators.required])]
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
