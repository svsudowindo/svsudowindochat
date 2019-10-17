import { Component, OnInit } from '@angular/core';
import { BreadCrumbModel } from '../../../../shared/components/bread-crumb/bread-crumb.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'Companies',
      link: '/companies'
    },
    {
      label: 'Details'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
