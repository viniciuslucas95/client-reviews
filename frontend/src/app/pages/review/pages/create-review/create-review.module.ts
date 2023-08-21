import { NgModule } from '@angular/core';

import {CreateReviewPage} from "./create-review.page";
import {ComponentsModule} from "../../../../components/components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        CreateReviewPage
    ],
    imports: [
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CreateReviewModule { }