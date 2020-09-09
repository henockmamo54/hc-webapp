import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictionComponent } from './prediction/prediction.component';
import { CardComponent } from './card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';  
import { MatRadioModule } from '@angular/material/radio';
import { PredictionPieChartComponent } from './prediction-pie-chart/prediction-pie-chart.component';
import {ManageApiCallService} from './manage-api-call.service' 
import { HttpClientModule } from '@angular/common/http';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { FinalPredictionHeaderValueComponent } from './final-prediction-header-value/final-prediction-header-value.component'; 

@NgModule({
  declarations: [
    AppComponent,
    PredictionComponent,
    CardComponent,
    PredictionPieChartComponent,
    BarchartComponent,
    FinalPredictionHeaderValueComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    MatSliderModule  , 
    MatProgressBarModule,
    ChartsModule,
    FormsModule, 
    MatRadioModule,
    HttpClientModule
  ],
  providers: [ManageApiCallService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
