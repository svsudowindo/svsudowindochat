import { Component, OnInit } from '@angular/core';
import { qualification } from './educational-details.enums';
@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {
  qualificationConst = qualification;
  constructor() { }

  ngOnInit() {
  }

}
