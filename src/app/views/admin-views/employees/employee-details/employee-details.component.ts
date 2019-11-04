import { StorageService } from './../../../../shared/services/storage.service';
import { LocalStorageEnums } from './../../../../shared/constants/localstorage-enums';
import { EncryptDectryptService } from './../../../../shared/services/common/encrypt-decrypt/encrypt-dectrypt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarMessengerService } from './../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { errors } from './../../../../shared/constants/errors';
import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { RequestEnums } from './../../../../shared/constants/request-enums';
import { CommonRequestService } from './../../../../shared/services/common-request.service';
import { BreadCrumbModel } from './../../../../shared/components/bread-crumb/bread-crumb.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Injector, inject } from '@angular/core';
import { VALIDATION_PATTERNS } from '../../../../shared/constants/validation-patterns';;
import { BaseClass } from '../../../../shared/services/common/baseClass';
import { DESIGNATION, STATUS } from './employee-details.enum';
import Utils from '../../../../shared/services/common/utils';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseClass implements OnInit {
  designationConst = DESIGNATION;
  statusConst = STATUS;
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'employees',
      link: '/employees'
    },
    {
      label: 'details'
    }
  ];
  employeeForm: FormGroup;
  validationMessages = {
    name: [
      { type: 'required', message: 'Employee Name required' }
    ],
    email: [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Enter Valid Email' }
    ],
    id: [
      { type: 'required', message: 'Employee ID required' }
    ],
    status: [
      { type: 'required', message: 'Status required' }
    ],
    dateOfJoining: [
      { type: 'required', message: 'Date of Joining required' }
    ],
    designation: [
      { type: 'required', message: 'Designation required' }
    ]
  };
  employeeID: any;
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private snackbarMessengerService: SnackbarMessengerService,
    private router: Router,
    private encryptDectryptService: EncryptDectryptService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
    super(injector);
    if (this.activatedRoute.snapshot.params.id) {
      this.employeeID = this.encryptDectryptService.getNormalText(this.activatedRoute.snapshot.params.id);
    }
  } 

  ngOnInit() {
    this.initEmployeeForm(); 
    if (Utils.isValidInput(this.employeeID)) {
      this.setEmployeeForm();
    }
  }
  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      id: ['', Validators.compose([Validators.required])],
      status: [1, Validators.compose([Validators.required])],
      dateOfJoining: ['', Validators.compose([Validators.required])],
      designation: ['', Validators.compose([Validators.required])],
      role: ['EMPLOYEE'],
      companyID:['']

    });
  }

  setEmployeeForm() {
    RequestEnums.GET_EMPLOYEE_BY_ID.values[0] = this.employeeID;
    this.commonRequestService.request(RequestEnums.GET_EMPLOYEE_BY_ID).subscribe(res => {
      if (res.errors.length > 0) {
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
        return;
      }
      if (res.status !== 200 || res.data === undefined || res.data === null) {
        this.snackbarMessengerService.openSnackBar(res.message, true);
        return;
      }
      const payload = Object.assign({}, res.data.employeeDetails, res.data.otherData);
      this.employeeForm.patchValue(payload);
    });
  }
  // field validation
  isValidField(fieldName) {
    if (this.employeeForm.get(fieldName).invalid && (this.employeeForm.get(fieldName).touched || this.employeeForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
  employeeDetails() {
    this.loaderService.showLoading();
    const postBody = Object.assign({}, this.employeeForm.value);
    postBody.dateOfJoining = this.employeeForm.value.dateOfJoining.getTime();
    postBody.companyID = this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    this.commonRequestService.request(RequestEnums.CREATE_EMPLOYEE, postBody).subscribe(res => {
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
      this.snackbarMessengerService.openSnackBar('Employee created successfully', false);
      this.loaderService.hideLoading();
      this.router.navigate(['employees']);
    });
  }
}
