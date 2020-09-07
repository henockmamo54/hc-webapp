import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-prediction-pie-chart',
  templateUrl: './prediction-pie-chart.component.html',
  styleUrls: ['./prediction-pie-chart.component.css']
})
export class PredictionPieChartComponent implements OnInit, OnChanges  {
 
  @Input("data") piechartdata: any;
  PieChart: any = [];

  constructor() {


  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.piechartdata);
    this.PieChart.data.datasets[0].data = this.piechartdata;
    this.PieChart.update()
  }

  ngOnInit(): void {

     
    console.log((this.piechartdata))

    this.PieChart = new Chart('mychart', {
      type: 'pie',
      data: {
        labels: ["Normal", "Prediabetes", "Diabetes"],
        datasets: [{
          label: '# of Votes',
          data: [45, 35, 20],
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

}
