import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    InvoiceListComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
        InvoiceRoutingModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class InvoiceModule { }
