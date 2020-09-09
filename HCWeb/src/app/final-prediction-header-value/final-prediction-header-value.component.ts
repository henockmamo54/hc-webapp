import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-final-prediction-header-value',
  templateUrl: './final-prediction-header-value.component.html',
  styleUrls: ['./final-prediction-header-value.component.css']
})
export class FinalPredictionHeaderValueComponent implements OnInit, AfterViewInit, OnChanges {
  PieChart: Chart;
  @ViewChild('canvas23') canvas23: ElementRef;
  @Input("input_percentage") input_percentage: any;
  @Input("input_status") input_status: any;

  status = "Diabetes"
  public canvasWidth = 300
  public needleValue = 45
  public centralLabel = '65% '
  public name = ''
  public bottomLabel = ''
  public options = {
    hasNeedle: false,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [30],
    rangeLabel: ['0', '100'],
    needleStartValue: 96,
  }

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("*********************on change method", 100 * Math.round((this.input_percentage + Number.EPSILON) * 100) / 100, this.input_status);
    this.status = this.input_status
    this.centralLabel = Math.round((this.input_percentage + Number.EPSILON) * 100) + "%";
    this.needleValue = Math.round((this.input_percentage + Number.EPSILON) * 100);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

}
