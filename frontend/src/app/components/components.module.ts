import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {PageContainerComponent} from "./page-container/page-container.component";
import {TableComponent} from "./table/table.component";

@NgModule({
    declarations: [
        PageContainerComponent,
        TableComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PageContainerComponent,
        TableComponent
    ],
})
export class ComponentsModule { }
