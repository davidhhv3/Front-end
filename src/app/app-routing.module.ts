import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'}, 
  {path: '**', redirectTo: '/home', pathMatch: 'full'}, 
];

@NgModule({
  imports: [HomeRoutingModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
