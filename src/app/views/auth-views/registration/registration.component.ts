import { BreadCrumbModel } from './../../../shared/components/bread-crumb/bread-crumb.model';
import { Component, OnInit, Injector } from '@angular/core';
import { EMPLOYEEDESIGNATION, STATUS } from './registration.enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseClass } from '../../../shared/services/common/baseClass';
import { VALIDATION_PATTERNS } from '../../../shared/constants/validation-patterns';

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
      label: 'Registration`Details',
    }
  ];
   superAdminForm: FormGroup;
   validationMessages = {
     companyName: [
       { type: 'required', message: 'Company Name required' }
     ],
     superAdminName: [
       { type: 'required', message: 'Company Admin Name required' }
     ],
     companyId: [
       { type: 'required', message: 'Company Id required' }
     ],
     employeeId: [
       { type: 'required', message: 'Company Id required' }
     ],
     companyEmail: [
       { type: 'required', message: 'Email required' },
       { type: 'pattern', message: 'Enter Valid Email' }
     ],
     companyMobileNumber: [
       { type: 'required', message: 'Mobile number required' },
       { type: 'pattern', message: 'Enter Valid Mobile Number' }
     ],
     employeeDesignation: [
       { type: 'required', message: 'Designation required' }
     ],
     status: [
      {type: 'required', message: 'Status required'}
    ],
    startDateOfContract:[
      {type: 'required', message: 'Start Date required'}
    ]
   };
   constructor(
     private formBuilder: FormBuilder,
     public injector: Injector
   ) {
     super(injector);
   }
 
   ngOnInit() {
     this.initsuperAdminForm();
   }
 
   initsuperAdminForm() {
     this.superAdminForm = this.formBuilder.group({
       companyName: ['', Validators.compose([Validators.required])],
       superAdminName: ['', Validators.compose([Validators.required])],
       companyId: ['', Validators.compose([Validators.required])],
       employeeId: ['', Validators.compose([Validators.required])],
       status: ['', Validators.compose([Validators.required])],
       employeeDesignation: ['', Validators.compose([Validators.required])],
       startDateOfContract: ['', Validators.compose([Validators.required])],
       companyEmail: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
       companyMobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.PHONE)])]
     });
   }
 
   // field validation
   isValidField(fieldName) {
     if (this.superAdminForm.get(fieldName).invalid && (this.superAdminForm.get(fieldName).touched || this.superAdminForm.get(fieldName).dirty)) {
       return true;
     }
     return false;
   }
}
