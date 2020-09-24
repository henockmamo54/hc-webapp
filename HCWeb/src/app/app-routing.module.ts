import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HyperlipidemiaPredictionComponent } from './Hyperlipidemia/hyperlipidemia-prediction/hyperlipidemia-prediction.component';
import { PredictionComponent } from './prediction/prediction.component';
import { IschemiaPredictionComponent } from './Ischemia/ischemia-prediction/ischemia-prediction.component';

const routes: Routes = [
  { path: 'home', component: PredictionComponent },
  { path: 'diabetes', component: PredictionComponent },
  { path: 'hyperlipidemia', component: HyperlipidemiaPredictionComponent },
  { path: 'ischemia', component: IschemiaPredictionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
