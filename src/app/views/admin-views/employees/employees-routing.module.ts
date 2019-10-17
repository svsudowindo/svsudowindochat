import { EmployeesComponent } from './employees.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
  path: '',
  children: [
    {
      path: '',
      component: EmployeesComponent
    },
    {
      path: 'details',
      loadChildren: () => import('./employee-details/employee-details.module').then(m => m.EmployeeDetailsModule)
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
