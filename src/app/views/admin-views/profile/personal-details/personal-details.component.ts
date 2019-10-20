import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  PersonalDetailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initPersonalDetailsForm();
  }
  initPersonalDetailsForm() {
    this.PersonalDetailsForm = this.formBuilder.group({
      FullName: [''],
      Gender: [''],
      DateOfBirth: [''],
      EmailId: [''],
      PhoneNumber: [''],
      employeeId: [''],
      Country: [''],
      State: [''],
      City: [''],
      PinCode: [''],
      Address: [''],
    });


  }
} 
