import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material';
import { EmployeesBulkUploadComponent } from './employees-bulk-upload/employees-bulk-upload.component';

@NgModule({
  declarations: [EmployeesComponent, EmployeesBulkUploadComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    EmployeesBulkUploadComponent
  ]
})
export class EmployeesModule { }
