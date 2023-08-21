import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

import {PageContainerComponent} from "./page-container/page-container.component";
import {HeaderComponent} from "./header/header.component";
import {TableComponent} from "./table/table.component";

@NgModule({
    declarations: [
        PageContainerComponent,
        HeaderComponent,
        TableComponent
    ],
    imports: [
      CommonModule,
      NgbModalModule
    ],
    exports: [
        PageContainerComponent,
        HeaderComponent,
        TableComponent
    ],
})
export class ComponentsModule { }
