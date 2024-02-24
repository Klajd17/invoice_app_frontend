import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {CustomerModule} from "./invoices-components/customer/customer.module";
import {InvoiceModule} from "./invoices-components/invoice/invoice.module";
import {ItemModule} from "./invoices-components/item/item.module";



@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        CustomerModule,
        InvoiceModule,
        ItemModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
