import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,
    children:[ //los hijos de home
      {path:'', 
          loadChildren: () => import ('../product/product.module').then(m => m.ProductModule) 
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
