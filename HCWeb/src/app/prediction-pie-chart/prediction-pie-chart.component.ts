import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-prediction-pie-chart',
  templateUrl: './prediction-pie-chart.component.html',
  styleUrls: ['./prediction-pie-chart.component.css']
})
export class PredictionPieChartComponent implements OnInit, OnChanges {

  @Input("data") piechartdata: any;
  PieChart: any = [];

  constructor() {

  }

  ngOnInit(): void {

    this.InintPiechart();

  }

  InintPiechart() {

    this.PieChart = new Chart('mychart', {
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
          easing: "easeInOutExpo"
        }
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("test ", this.piechartdata, this.piechartdata.data)
    // if (this.piechartdata.data === undefined) {
    //   this.InintPiechart();
    // }
    // else {
    if (this.piechartdata.data !== undefined) {
      this.PieChart.data.datasets[0].data = this.piechartdata;
      this.PieChart.update()
    }
    else { this.InintPiechart(); }


  }

}
