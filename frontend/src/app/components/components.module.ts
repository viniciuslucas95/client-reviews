import { NgModule } from '@angular/core';

import {PageContainerComponent} from "./page-container/page-container.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
    declarations: [
        PageContainerComponent,
        HeaderComponent
    ],
    exports: [
        PageContainerComponent,
        HeaderComponent
    ],
})
export class ComponentsModule { }
