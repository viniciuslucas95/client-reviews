import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import {ClientModule} from "./pages/client/client.module";
import {ReviewModule} from "./pages/review/review.module";
import {ComponentsModule} from "./components/components.module";
import {HttpClientModule} from "@angular/common/http";
import {CreateReviewModule} from "./pages/review/pages/create-review/create-review.module";

@NgModule({
  declarations: [
    AppComponent,
    LateralMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    ReviewModule,
    CreateReviewModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
