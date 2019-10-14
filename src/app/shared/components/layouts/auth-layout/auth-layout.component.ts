import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  corousalConfig = {
    showNavigationArrows: false,
    showNavigationIndicators: false
  };
  images = [
    {
      src: '../../../../../assets/images/one.jpg'
    },
    {
      src: '../../../../../assets/images/two.jpg'
    },
    {
      src: '../../../../../assets/images/three.jpg'
    }
  ];
  pauseOnHover = true;
  constructor() { }

  ngOnInit() {
  }

}
