import { NgModule } from '@angular/core';

import {ReviewPage} from "./review.page";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        ReviewPage
    ],
    imports: [
        ComponentsModule
    ]
})
export class ReviewModule { }
