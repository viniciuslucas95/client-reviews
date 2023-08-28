import { NgModule } from '@angular/core';

import { ReviewPage } from './review.page';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReviewPage],
  imports: [ComponentsModule, FormsModule, ReactiveFormsModule],
})
export class ReviewModule {}
