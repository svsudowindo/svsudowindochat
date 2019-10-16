import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompaniesComponent,
      },
      {
        path: 'details',
        loadChildren: () => import('./company-details/company-details.module').then(m => m.CompanyDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
