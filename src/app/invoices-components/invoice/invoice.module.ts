import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";


@NgModule({
  declarations: [
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
