import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../AppComponent/app.component';
import { NotFoundComponent } from '../NotFoundComponent/NotFound.component';

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
