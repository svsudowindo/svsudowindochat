import { BreadCrumbModel } from './../../../shared/components/bread-crumb/bread-crumb.model';
import { Component, OnInit, Injector } from '@angular/core';
import { EMPLOYEEDESIGNATION, STATUS } from './registration.enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseClass } from '../../../shared/services/common/baseClass';
import { VALIDATION_PATTERNS } from '../../../shared/constants/validation-patterns';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { SnackbarMessengerService } from '../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/components/componentsAsService/loader/loader.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseClass implements OnInit {
  employeeDesignationConst = EMPLOYEEDESIGNATION;
  statusConst = STATUS;
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'Registration Details',
    }
  ];
  superAdminForm: FormGroup;
  validationMessages = {
    companyName: [
      { type: 'required', message: 'Company Name required' }
    ],
    name: [
      { type: 'required', message: 'Company Admin Name required' }
    ],
    companyID: [
      { type: 'required', message: 'Company Id required' }
    ],
    id: [
      { type: 'required', message: 'Company Id required' }
    ],
    email: [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Enter Valid Email' }
    ],
    mobileNumber: [
      { type: 'required', message: 'Mobile number required' },
      { type: 'pattern', message: 'Enter Valid Mobile Number' }
    ],
    designation: [
      { type: 'required', message: 'Designation required' }
    ],
    status: [
      { type: 'required', message: 'Status required' }
    ],
    contractStartDate: [
      { type: 'required', message: 'Contract Start Date required' }
    ],
    contractEndDate: [
      { type: 'required', message: 'Contract End Date required' }
    ],
    dateOfJoining: [
      { type: 'required', message: 'Employee Date of Joining required' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector,
    private commonRequestService: CommonRequestService,
    private snackbarMessengerService: SnackbarMessengerService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initsuperAdminForm();
  }

  initsuperAdminForm() {
    this.superAdminForm = this.formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      companyID: ['', Validators.compose([Validators.required])],
      id: ['', Validators.compose([Validators.required])],
      status: [1, Validators.compose([Validators.required])],
      designation: ['', Validators.compose([Validators.required])],
      contractStartDate: ['', Validators.compose([Validators.required])],
      contractEndDate: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.PHONE)])],
      role: ['SUPER_ADMIN'],
      dateOfJoining: ['', Validators.compose([Validators.required])]
    });
  }

  // field validation
  isValidField(fieldName) {
    // tslint:disable-next-line:max-line-length
    if (this.superAdminForm.get(fieldName).invalid && (this.superAdminForm.get(fieldName).touched || this.superAdminForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }

  // registration flow
  registerSuperAdmin() {
    this.loaderService.showLoading();
    const postBody = this.superAdminForm.value;
    postBody.contractEndDate = this.superAdminForm.get('contractEndDate').value.getTime();
    postBody.contractStartDate = this.superAdminForm.get('contractStartDate').value.getTime();
    postBody.dateOfJoining = this.superAdminForm.get('contractEndDate').value.getTime();
    RequestEnums.REGISTRATION.values[0] = 'abc123';
    this.commonRequestService.request(RequestEnums.REGISTRATION, postBody).subscribe(res => {
      if (res.errors.length > 0) {
        // error
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
      } else if (res.status !== 200 || res.data === undefined || res.data === null) {
        this.snackbarMessengerService.openSnackBar('Something went wrong... Please try again.', true);
        this.loaderService.hideLoading();
      } else {
        this.snackbarMessengerService.openSnackBar('Super Admin Registered Successfully', false);
        this.loaderService.hideLoading();
        this.router.navigate(['login']);
      }
    }, (error) => {
      console.log('err', error);
      this.snackbarMessengerService.openSnackBar(error, true);
      this.loaderService.hideLoading();
    });
  }
}
