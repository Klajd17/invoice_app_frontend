import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer/components/customer-list/customer-list.component";
import {InvoiceListComponent} from "./invoice/components/invoice-list/invoice-list.component";
import {ItemListComponent} from "./item/components/item-list/item-list.component";
import {ItemAddUpdateComponent} from "./item/components/item-add-update/item-add-update.component";

export const MaterialRoutes: Routes = [
  {
    path: 'invoice',
    component: InvoiceListComponent ,
  },
  {
    path: 'item',
    component: ItemListComponent ,
  },
  {
    path: 'customer',
    component: CustomerListComponent ,
  },
  {
    path: 'item-add-update',
    component: ItemAddUpdateComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(MaterialRoutes)],
  exports: [RouterModule]
})
export class InvoicesComponentsRoutingModule { }
