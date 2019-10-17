import { Component, OnInit, Injector, inject } from '@angular/core';
import { BreadCrumbModel } from '../../../../shared/components/bread-crumb/bread-crumb.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VALIDATION_PATTERNS } from '../../../../shared/constants/validation-patterns';
import { BaseClass } from '../../../../shared/services/common/baseClass';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent extends BaseClass implements OnInit {
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
    companyAdminName: [
      { type: 'required', message: 'Company Admin Name required' }
    ],
    companyEmail: [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Enter Valid Email' }
    ],
    companyMobileNumber: [
      { type: 'required', message: 'Mobile number required' },
      { type: 'pattern', message: 'Enter Valid Mobile Number' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initCompanyForm();
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      companyAdminName: ['', Validators.compose([Validators.required])],
      companyId: [''],
      companyEmail: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      companyMobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.PHONE)])]
    });
  }

  // field validation
  isValidField(fieldName) {
    if (this.companyForm.get(fieldName).invalid && (this.companyForm.get(fieldName).touched || this.companyForm.get(fieldName).dirty)) {
      return true;
    }
    return false;
  }
}
