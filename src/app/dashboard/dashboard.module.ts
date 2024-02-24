import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from "@angular/router";
import {DashboardRoutes} from "./dashboard-routing";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
