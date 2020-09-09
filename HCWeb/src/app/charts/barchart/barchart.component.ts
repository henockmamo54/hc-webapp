import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import * as Chart from 'chart.js';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input("data") chartdata: any;
  @Input("data_label") chartlabel: any;
  @Input("chartFeatureName") chartFeatureName: any;
  @Input("currentValue") currentValue: any;
  @Input("id") id: any;
  BarChart: any = [];
  chartcolor: any = [];



  constructor() {  

  }

  ngAfterViewChecked() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.prepareChartColors(2);

    if (this.BarChart.length != 0) {
      this.BarChart.data.datasets[0].data = this.chartdata;
      this.BarChart.data.labels = this.chartlabel;
      this.BarChart.data.datasets[0].backgroundColor = this.chartcolor;
      this.BarChart.data.datasets[0].borderColor = this.chartcolor;
      this.BarChart.update()
    }
    else {

    }

  }

  prepareChartColors(index: any) {
    // 'rgba(75, 192, 192, 0.2)'
    index = Math.floor(Math.random() * Math.floor(6))

    var colors = []
    for (let i = 0; i < 10; i++) {
      if (i == index) colors[i] = 'rgb(39,166,154)'
      else
        colors[i] = 'rgba(75, 192, 192, 0.3)'
    }

    this.chartcolor = colors;

  }

  ngOnInit(): void {
    // Bar chart:

    this.BarChart = new Chart("bar", {
      type: 'bar',
      data: {
        labels: this.chartlabel,
        datasets: [{
          label: "",//'# of Votes',
          data: this.chartdata,//[9, 7, 3, 5, 2, 10],
          backgroundColor: this.chartcolor,
          borderColor: this.chartcolor,
          borderWidth: 1
        }]
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        title: {
          text: "Bar Chart",
          display: false,
          position: "top"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    });

  }

}
