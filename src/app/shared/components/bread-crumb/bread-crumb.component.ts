import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbModel } from './bread-crumb.model';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input()
  breadCrumbs: BreadCrumbModel[];
  constructor() { }

  ngOnInit() {
  }

}
