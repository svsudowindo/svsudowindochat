import { EMPLOYEEDESIGNATION, STATUS } from './company-details.enum';
import { Component, OnInit, Injector, inject } from '@angular/core';
import { BreadCrumbModel } from '../../../../shared/components/bread-crumb/bread-crumb.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VALIDATION_PATTERNS } from '../../../../shared/constants/validation-patterns';
import { BaseClass } from '../../../../shared/services/common/baseClass';
import { CommonRequestService } from '../../../../shared/services/common-request.service';
import { RequestEnums } from '../../../../shared/constants/request-enums';
import { errors } from '../../../../shared/constants/errors';
import { SnackbarMessengerService } from '../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/components/componentsAsService/loader/loader.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent extends BaseClass implements OnInit {
  employeeDesignationConst = EMPLOYEEDESIGNATION;
  statusConst = STATUS;
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'Companies',
      link: '/companies'
    },
    {
      label: 'Details'
    }
  ];
  companyForm: FormGroup;
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
      { type: 'required', message: 'Contract End Date required' }
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
    this.initCompanyForm();
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      companyID: ['', Validators.compose([Validators.required])],
      id: ['', Validators.compose([Validators.required])],
      contractStartDate: ['', Validators.compose([Validators.required])],
      contractEndDate: ['', Validators.compose([Validators.required])],
      dateOfJoining: ['', Validators.compose([Validators.required])],
      designation: ['', Validators.compose([Validators.required])],
      status: [1, Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      mobileNumber: [, Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.PHONE)])],
      role: ['ADMIN']
    });
  }

  // field validation
  isValidField(fieldName) {
    if (this.companyForm.get(fieldName).invalid && (this.companyForm.get(fieldName).touched || this.companyForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
  companyDetails() {
    this.loaderService.showLoading();
    const postBody = Object.assign({}, this.companyForm.value);
    postBody.contractStartDate = this.companyForm.value.contractStartDate.getTime();
    postBody.contractEndDate = this.companyForm.value.contractEndDate.getTime();
    postBody.dateOfJoining = this.companyForm.value.dateOfJoining.getTime();
    this.commonRequestService.request(RequestEnums.CREATE_COMPANY, postBody).subscribe(res => {
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
      this.snackbarMessengerService.openSnackBar('Company created successfully', false);
      this.loaderService.hideLoading();
      this.router.navigate(['companies']);
    });
  }
}
