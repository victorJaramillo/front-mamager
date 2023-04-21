import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceEnableComponent } from './admin/service-enable/service-enable.component';
import { BodyComponent } from './body/body/body.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'admin/enabled-services', component: ServiceEnableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
