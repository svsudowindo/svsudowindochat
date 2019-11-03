import { BreadCrumbModel } from './../../../../shared/components/bread-crumb/bread-crumb.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Injector, inject } from '@angular/core';
import { VALIDATION_PATTERNS } from '../../../../shared/constants/validation-patterns';;
import { BaseClass } from '../../../../shared/services/common/baseClass';
import { EMPLOYEEDESIGNATION } from './employee-details.enum';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseClass implements OnInit {
  employeeDesignationConst = EMPLOYEEDESIGNATION;
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
    employeeName: [
      { type: 'required', message: 'Employee Name required' }
    ],
    employeeEmail: [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Enter Valid Email' }
    ],
    employeeId: [
      { type: 'required', message: 'Employee ID required' }
    ],
    employeeDateOfJoining: [
      { type: 'required', message: 'Date of Joining required' }
    ],
    employeeDesignation: [
      { type: 'required', message: 'Designation required' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initEmployeeForm();
  }
  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.compose([Validators.required])],
      employeeEmail: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      employeeId: ['', Validators.compose([Validators.required])],
      employeeDateOfJoining: ['', Validators.compose([Validators.required])],
      employeeDesignation: ['', Validators.compose([Validators.required])]
    });
  }

  // field validation
  isValidField(fieldName) {
    if (this.employeeForm.get(fieldName).invalid && (this.employeeForm.get(fieldName).touched || this.employeeForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
}

