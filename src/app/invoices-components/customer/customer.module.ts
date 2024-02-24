import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";


@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
