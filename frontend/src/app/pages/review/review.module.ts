import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReviewPage} from "./review.page";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        ReviewPage
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class ReviewModule { }
