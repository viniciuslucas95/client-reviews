import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClientPage } from './client.page';
import { ComponentsModule } from '../../components/components.module';
import { CreateClientModalComponent } from './components/create-client-modal/create-client-modal.component';

@NgModule({
  declarations: [ClientPage, CreateClientModalComponent],
  imports: [ComponentsModule, CommonModule, ReactiveFormsModule],
})
export class ClientModule {}
