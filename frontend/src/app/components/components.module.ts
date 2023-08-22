import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

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
        CommonModule
    ],
    exports: [
        PageContainerComponent,
        HeaderComponent,
        TableComponent
    ],
})
export class ComponentsModule { }
