import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReviewPage } from './review.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ReviewPage],
  imports: [ComponentsModule, CommonModule, ReactiveFormsModule],
})
export class ReviewModule {}
