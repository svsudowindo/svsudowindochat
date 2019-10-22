import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.scss']
})
export class EmploymentDetailsComponent implements OnInit {

  employmentForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.initEmploymentForm();
  }
  initEmploymentForm() {
    this.employmentForm = this.formBuilder.group({
      employment: this.formBuilder.array([this.eachEmploymentForm()])
    });
  }
  eachEmploymentForm(): FormGroup {
    return this.formBuilder.group({

      previousCompanyName: [''],
      previousCompanyID: [''],
      location: [''],
      role: [''],
      startDate: [''],
      endDate: ['']
    });
  }
  ngOnInit() {
  }
  addNewEmployment() {
    (this.employmentForm.get('employment') as FormArray).push(this.eachEmploymentForm());
  }

  deleteemployment(index) {
    (this.employmentForm.get('employment') as FormArray).removeAt(index);
  }
}
