import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  screenWidth: number;
  isSideNavOpen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
    if (this.isSideNavOpen) {
      this.openNav();
    }
  }
  constructor(
    private router: Router
  ) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.openNav();
  }

  openNav() {
    this.isSideNavOpen = true;
    if (this.screenWidth < 576) {
      // very small screens
      document.getElementById('sideNavigation').style.width = '120px';
      document.getElementById('main').style.marginLeft = '120px';
    } else if (this.screenWidth >= 576 && this.screenWidth < 768) {
      // small screens
      document.getElementById('sideNavigation').style.width = '300px';
      document.getElementById('main').style.marginLeft = '300px';
    } else if (this.screenWidth >= 768 && this.screenWidth < 992) {
      document.getElementById('sideNavigation').style.width = '400px';
      document.getElementById('main').style.marginLeft = '400px';
    } else if (this.screenWidth >= 992 && this.screenWidth < 1200) {
      document.getElementById('sideNavigation').style.width = '400px';
      document.getElementById('main').style.marginLeft = '400px';
    } else {
      document.getElementById('sideNavigation').style.width = '400px';
      document.getElementById('main').style.marginLeft = '400px';
    }
  }

  closeNav() {
    document.getElementById('sideNavigation').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

}
