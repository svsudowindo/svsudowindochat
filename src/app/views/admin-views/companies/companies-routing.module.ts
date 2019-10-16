import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent} from './companies.component';
import { CompanyDetailsComponent} from './company-details/company-details.component';
const routes: Routes = [
  {
  path: '',
  children: [
    {path:'',
    component: CompaniesComponent,
  
  },
    {
      path: 'CompanyDetails',
      loadChildren: () => import('./company-details/company-details.module').then(m => m.CompanyDetailsModule),

      component: CompanyDetailsComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
