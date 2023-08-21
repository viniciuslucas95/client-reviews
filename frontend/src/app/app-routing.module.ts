import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientPage} from "./pages/client/client.page";
import {ReviewPage} from "./pages/review/review.page";

const routes: Routes = [
  {
    path: 'clientes/:page',
    component: ClientPage
  },
  {
    path: 'avaliacoes',
    component: ReviewPage
  },
  {
    path: '**',
    redirectTo: 'clientes/1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
