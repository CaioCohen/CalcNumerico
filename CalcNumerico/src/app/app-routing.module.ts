import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { RaizesComponent } from './main/raizes/raizes.component';
import { TaylorComponent } from './main/taylor/taylor.component';
import { ValorInicialComponent } from './main/valor-inicial/valor-inicial.component';
import { SisLinComponent } from './main/sis-lin/sis-lin.component';
import { InterpolacaoComponent } from './main/interpolacao/interpolacao.component';
import { AjustesCurvasComponent } from './main/ajustes-curvas/ajustes-curvas.component';
import { IntegracaoComponent } from './main/integracao/integracao.component';
import { ValorContornoComponent } from './main/valor-contorno/valor-contorno.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'raizes', component: RaizesComponent},
  {path: 'taylor', component: TaylorComponent},
  {path: 'valor-inicial', component: ValorInicialComponent},
  {path: 'sistemas-lineares', component: SisLinComponent},
  {path: 'problema-de-valor-de-contorno', component: ValorContornoComponent},
  {path: 'interpolacao', component: InterpolacaoComponent},
  {path: 'ajustes-de-curvas', component: AjustesCurvasComponent},
  {path: 'integracao-numerica', component: IntegracaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
