import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA = [
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' }

];
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  displayedColumns: string[] = [ 'companyID', 'companyName', 'companyEmail', 'createdBy', 'updatedBy'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
