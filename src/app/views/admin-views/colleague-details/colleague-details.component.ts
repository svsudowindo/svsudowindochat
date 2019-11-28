import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colleague-details',
  templateUrl: './colleague-details.component.html',
  styleUrls: ['./colleague-details.component.scss']
})
export class ColleagueDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
