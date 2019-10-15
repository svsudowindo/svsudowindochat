import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';

@NgModule({
  declarations: [CompaniesComponent, CompanyDetailsComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule
  ]
})
export class CompaniesModule { }
