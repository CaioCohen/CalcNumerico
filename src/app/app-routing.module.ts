import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { RaizesComponent } from './main/raizes/raizes.component';
import { TaylorComponent } from './main/taylor/taylor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'raizes', component: RaizesComponent},
  {path: 'taylor', component: TaylorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
