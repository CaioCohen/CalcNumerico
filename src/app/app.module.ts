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
import { ValorInicialComponent } from './main/valor-inicial/valor-inicial.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { FormsModule } from '@angular/forms';
import { SisLinComponent } from './main/sis-lin/sis-lin.component';

import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RaizesComponent,
    FracaoComponent,
    TaylorComponent,
    ValorInicialComponent,
    GraficoComponent,
    SisLinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    TooltipModule.forRoot()
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
