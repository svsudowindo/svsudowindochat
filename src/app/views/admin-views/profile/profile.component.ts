import { Component, OnInit } from '@angular/core';
import { BreadCrumbModel } from '../../../shared/components/bread-crumb/bread-crumb.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'Profile'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
