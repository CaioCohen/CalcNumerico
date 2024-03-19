import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { RaizesComponent } from './main/raizes/raizes.component';
import { TaylorComponent } from './main/taylor/taylor.component';
import { ValorInicialComponent } from './main/valor-inicial/valor-inicial.component';
import { SisLinComponent } from './main/sis-lin/sis-lin.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'raizes', component: RaizesComponent},
  {path: 'taylor', component: TaylorComponent},
  {path: 'valor-inicial', component: ValorInicialComponent},
  {path: 'sistemas-lineares', component: SisLinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
