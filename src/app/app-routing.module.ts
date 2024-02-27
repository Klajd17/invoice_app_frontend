import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/components/home/home.component";
import {FullComponent} from "./core/components/layouts/full/full.component";

const routes: Routes = [
  { path: '', redirectTo: '/invoice-app/invoice', pathMatch: 'full' },
  { path: 'home', redirectTo: '/invoice-app/invoice', pathMatch: 'full'  },

  {
    path: 'invoice-app',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/invoice-app/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./invoices-components/invoices-components.module').then(m => m.InvoicesComponentsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
