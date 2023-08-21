import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {ClientPage} from "./client.page";
import {ComponentsModule} from "../../components/components.module";
import {CreateClientModalComponent} from "./components/create-client-modal/create-client-modal.component";

@NgModule({
    declarations: [
        ClientPage,
        CreateClientModalComponent
    ],
    imports: [
        ComponentsModule,
        FormsModule
    ]

})
export class ClientModule { }
