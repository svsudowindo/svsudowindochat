import { GENDER } from './personal-details.enums';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  genderConst = GENDER;
  personalDetailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initPersonalDetailsForm();
  }
  initPersonalDetailsForm() {
    this.personalDetailsForm = this.formBuilder.group({
      fullName: [''],
      gender: [''],
      dateOfBirth: [''],
      emailId: [''],
      phoneNumber: [''],
      employeeId: [''],
      country: [''],
      state: [''],
      city: [''],
      pinCode: [''],
      address: [''],
    });


  }
} 
