import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CreateReviewPage} from "./create-review.page";
import {ComponentsModule} from "../../../../components/components.module";
import {CreateReviewModalComponent} from "./components/create-review-modal/create-review-modal.component";

@NgModule({
    declarations: [
        CreateReviewPage,
        CreateReviewModalComponent
    ],
    imports: [
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CreateReviewModule { }
