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
import { GaugeChartModule } from 'angular-gauge-chart'
import {MatTabsModule} from '@angular/material/tabs';
import { DiabetespredictionStyle1Component } from './diabetes/diabetesprediction-style1/diabetesprediction-style1.component';
import { DiabetespredictionStyle2Component } from './diabetes/diabetesprediction-style2/diabetesprediction-style2.component'
import {MatTableModule} from '@angular/material/table';
import { NgxGaugeModule } from 'ngx-gauge';
import { HyperlipidemiaPredictionComponent } from './Hyperlipidemia/hyperlipidemia-prediction/hyperlipidemia-prediction.component';
import { HyperlipidemiaPredictionType1Component } from './Hyperlipidemia/hyperlipidemia-prediction-type1/hyperlipidemia-prediction-type1.component';
import { IschemiaPredictionType1Component } from './Ischemia/ischemia-prediction-type1/ischemia-prediction-type1.component';
import { IschemiaPredictionComponent } from './Ischemia/ischemia-prediction/ischemia-prediction.component';
import { IschemiaPredictionType2Component } from './Ischemia/ischemia-prediction-type2/ischemia-prediction-type2.component';
import { HyperlipidemiaPredictionType2Component } from './Hyperlipidemia/hyperlipidemia-prediction-type2/hyperlipidemia-prediction-type2.component';
import {MatSelectModule} from '@angular/material/select';
import { HyperlipidemiaStatusPiechartComponent } from './Hyperlipidemia/hyperlipidemia-status-piechart/hyperlipidemia-status-piechart.component';


@NgModule({
  declarations: [
    AppComponent,
    PredictionComponent,
    CardComponent,
    PredictionPieChartComponent,
    BarchartComponent,
    FinalPredictionHeaderValueComponent,
    DiabetespredictionStyle1Component,
    DiabetespredictionStyle2Component,
    HyperlipidemiaPredictionComponent,
    HyperlipidemiaPredictionType1Component,
    IschemiaPredictionType1Component,
    IschemiaPredictionComponent,
    IschemiaPredictionType2Component,
    HyperlipidemiaPredictionType2Component,
    HyperlipidemiaStatusPiechartComponent 
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
    HttpClientModule,
    GaugeChartModule,
    MatTabsModule,
    MatTableModule,
    NgxGaugeModule,
    MatSelectModule
  ],
  providers: [ManageApiCallService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
