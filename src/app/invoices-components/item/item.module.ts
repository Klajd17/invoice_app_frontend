import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";


@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    ItemRoutingModule
  ]
})
export class ItemModule { }
