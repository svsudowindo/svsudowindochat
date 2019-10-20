import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QUALIFICATION } from './educational-details.enums';
@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {
  qualificationConst = QUALIFICATION;
  educationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.initEducationalForm();
  }

  initEducationalForm() {
    this.educationForm = this.formBuilder.group({
      education: this.formBuilder.array([this.eachEducationForm()])
    });
  }

  eachEducationForm(): FormGroup {
    return this.formBuilder.group({
      qualification: [''],
      instituteName: [''],
      location: [''],
      state: [''],
      startDate: [''],
      endDate: ['']
    });
  }
  ngOnInit() {
  }

  addNewQualification() {
    (this.educationForm.get('education') as FormArray).push(this.eachEducationForm());
  }

  deleteEducation(index) {
    (this.educationForm.get('education') as FormArray).removeAt(index);
  }
}
