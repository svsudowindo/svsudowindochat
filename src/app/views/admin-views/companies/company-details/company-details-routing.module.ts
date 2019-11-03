import { CompanyDetailsComponent } from './company-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: '',
      component: CompanyDetailsComponent
    },
    {
      path: ':id',
      component: CompanyDetailsComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDetailsRoutingModule { }
