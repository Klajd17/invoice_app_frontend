import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { CustomerAddUpdateComponent } from './components/customer-add-update/customer-add-update.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerAddUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
