import { RegistrationComponent } from './views/auth-views/registration/registration.component';
import { Registration } from './views/auth-views/registration/registration.model';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard Services
import { CanActivateService } from './shared/services/guard-services/can-activate.service';
import { CanLoadService } from './shared/services/guard-services/can-load.service';
import { CanActivateChildService } from './shared/services/guard-services/can-activate-child.service';

// Layout components
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { CustomPreloaderService } from './shared/services/common/preloaders/custom-preloader.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // add the paths which can be used before login
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./views/auth-views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: '404',
        loadChildren: () => import('./views/auth-views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./views/auth-views/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      }
    ]
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'svsudowindo',
        loadChildren: () => import('./views/auth-views/registration/registration.module').then(m => m.RegistrationModule)
      }
    ]
  },
  // add the paths which can be used post login
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [CanActivateService],
    canActivateChild: [CanActivateChildService], // Use when we want to make a disission to load sub modules or not
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/admin-views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [CanLoadService] // Use when we want to make a disission to load sub modules or not
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/admin-views/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'companies',
        loadChildren: () => import('./views/admin-views/companies/companies.module').then(m => m.CompaniesModule),
      },
      {
        path: 'employees',
        loadChildren: () => import('./views/admin-views/employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: 'colleague-details/:id',
        loadChildren: () => import('./views/admin-views/colleague-details/colleague-details.module').then(m => m.ColleagueDetailsModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/admin-views/chat/chat.module').then(m => m.ChatModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloaderService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
