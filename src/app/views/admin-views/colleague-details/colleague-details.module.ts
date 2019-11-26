import { SharedModule } from 'src/app/shared/shared.module';
import { ColleagueDetailsComponent } from './colleague-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColleagueDetailsRoutingModule } from './colleague-details-routing.module';

@NgModule({
  declarations: [ColleagueDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ColleagueDetailsRoutingModule
  ]
})
export class ColleagueDetailsModule { }
