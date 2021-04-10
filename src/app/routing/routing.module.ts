import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationComponent } from '../visualization-page/visualization/visualization.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'visualization'
  },
  {
    path: 'visualization',
    component: VisualizationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }