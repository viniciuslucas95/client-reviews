import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { ClientModule } from './pages/client/client.module';
import { ReviewModule } from './pages/review/review.module';
import { ComponentsModule } from './components/components.module';
import { CreateReviewModule } from './pages/review/pages/create-review/create-review.module';
import injectable from './constants/injectable.constant';
import ClientService from './pages/client/client.service';
import ReviewService from './pages/review/review.service';

@NgModule({
  declarations: [AppComponent, LateralMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    ReviewModule,
    CreateReviewModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: injectable.clientService,
      useClass: ClientService,
    },
    {
      provide: injectable.reviewService,
      useClass: ReviewService,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
