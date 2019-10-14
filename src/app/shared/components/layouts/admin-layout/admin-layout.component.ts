import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.openNav();
  }

  openNav() {
    document.getElementById('sideNavigation').style.width = '180px';
    document.getElementById('main').style.marginLeft = '180px';
  }

  closeNav() {
    document.getElementById('sideNavigation').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

}
