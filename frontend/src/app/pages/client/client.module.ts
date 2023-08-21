import { NgModule } from '@angular/core';

import {ClientPage} from "./client.page";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        ClientPage
    ],
    imports: [
        ComponentsModule
    ]

})
export class ClientModule { }
