import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import PlayComponent from './play/play.component';
import RegisterComponent from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  // { path: 'rooms/:oid', component: undefined },
  // { path: 'play/:roomId', component: undefined },
  { path: 'play', component: PlayComponent }
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule { }
