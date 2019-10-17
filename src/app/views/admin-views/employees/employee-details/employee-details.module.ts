import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeDetailsComponent} from './employee-details.component';
import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    EmployeeDetailsRoutingModule,
    SharedModule
  ]
})
export class EmployeeDetailsModule { }
