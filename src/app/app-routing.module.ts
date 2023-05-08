import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './admin/anime/anime.component';
import { ServiceEnableComponent } from './admin/service-enable/service-enable.component';
import { BodyComponent } from './body/body/body.component';
import { ApikeysComponent } from './admin/apikeys/apikeys.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'admin/enabled-services', component: ServiceEnableComponent },
  { path: 'admin/animes', component: AnimeComponent },
  { path: 'admin/apikeys', component: ApikeysComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
