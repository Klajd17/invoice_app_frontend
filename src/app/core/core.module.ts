import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FullComponent } from './components/layouts/full/full.component';
import { HeaderComponent } from './components/layouts/full/header/header.component';
import { SidebarComponent } from './components/layouts/full/sidebar/sidebar.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent,
  ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule
    ]
})
export class CoreModule { }
