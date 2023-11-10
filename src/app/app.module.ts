import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { RaizesComponent } from './main/raizes/raizes.component';
import { FracaoComponent } from './components/fracao/fracao.component';
import { TaylorComponent } from './main/taylor/taylor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RaizesComponent,
    FracaoComponent,
    TaylorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
