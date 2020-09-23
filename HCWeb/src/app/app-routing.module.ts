import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HyperlipidemiaPredictionComponent } from './Hyperlipidemia/hyperlipidemia-prediction/hyperlipidemia-prediction.component';
import { PredictionComponent } from './prediction/prediction.component';

const routes: Routes = [
  { path: 'home', component: PredictionComponent },
  { path: 'diabetes', component: PredictionComponent },
  { path: 'hyperlipidemia', component: HyperlipidemiaPredictionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
