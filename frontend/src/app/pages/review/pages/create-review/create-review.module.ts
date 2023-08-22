import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

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
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CreateReviewModule { }
