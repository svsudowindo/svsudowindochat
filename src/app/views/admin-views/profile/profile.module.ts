import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../../shared/shared.module';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { EmploymentDetailsComponent } from './employment-details/employment-details.component';
import { EducationalDetailsComponent } from './educational-details/educational-details.component';

@NgModule({
  declarations: [ProfileComponent, PersonalDetailsComponent, EmploymentDetailsComponent, EducationalDetailsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
