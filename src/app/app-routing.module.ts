import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';

import { PComponent } from './p/p.component';

const routes: Routes = [

  {path: 'signup', component:AuthComponent},
  {path: 'p', component:PComponent},
  {path: '', component:AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
