import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ClientPage} from "./client.page";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        ClientPage
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class ClientModule { }
