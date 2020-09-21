import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-prediction-pie-chart',
  templateUrl: './prediction-pie-chart.component.html',
  styleUrls: ['./prediction-pie-chart.component.css']
})
export class PredictionPieChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input("data") piechartdata: any; 
  @ViewChild('mycanvas') canvas: ElementRef;
  @Input("id") id: any;
  PieChart: any = [];

  constructor() {
  }
  ngAfterViewInit(): void {
    
    this.InintPiechart();
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (this.PieChart.length != 0) {
      this.PieChart.data.datasets[0].data = this.piechartdata;
      this.PieChart.update()
    }
  }


  InintPiechart() {

    this.PieChart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ["Normal", "Prediabetes", "Diabetes"],
        datasets: [{
          label: '%',
          data: this.piechartdata,
          backgroundColor: [
            '#9CCC66',
            '#27A69A',
            '#465B65',
          ],
          borderColor: [
            '#9CCC66',
            '#27A69A',
            '#465B65',
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Next year status",
          display: true
        },
        legend: {
          display: true,
          position: "bottom"
        },
        animation: {
          easing: "easeInOutExpo",
          duration:1000
        }
      }
    });

  }

}
