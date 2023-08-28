import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPage } from './pages/client/client.page';
import { ReviewPage } from './pages/review/review.page';
import { CreateReviewPage } from './pages/review/pages/create-review/create-review.page';

const routes: Routes = [
  {
    path: 'avaliacoes/criar',
    component: CreateReviewPage,
  },
  {
    path: 'clientes/:page',
    component: ClientPage,
  },
  {
    path: 'avaliacoes/:page',
    component: ReviewPage,
  },
  {
    path: '**',
    redirectTo: 'clientes/1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
