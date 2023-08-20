import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import {ClientModule} from "./pages/client/client.module";
import {ReviewModule} from "./pages/review/review.module";
import {ComponentsModule} from "./components/components.module";

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
    ComponentsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
