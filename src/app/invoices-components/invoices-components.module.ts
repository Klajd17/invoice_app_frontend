import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesComponentsRoutingModule } from './invoices-components-routing.module';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
    imports: [
        CommonModule,
        InvoicesComponentsRoutingModule,
        SharedModule
    ]
})
export class InvoicesComponentsModule { }
