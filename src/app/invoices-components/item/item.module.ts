import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "../invoices-components-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../shared/shared.module";
import { ItemAddUpdateComponent } from './components/item-add-update/item-add-update.component';


@NgModule({
  declarations: [
    ItemListComponent,
    ItemAddUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    ItemRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class ItemModule { }
