import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})



export class PredictionComponent implements OnInit {

  constructor() { }

  PieChart: any = [];



  FPG = 150;
  hbalc = 6.8;
  gammagtp = 78;
  bmi = 15;
  triglycerides = 25;
  age = 28;
  uricacid = 5.5;
  sex = 0;
  physicalactivity = 5
  drinking = 2;
  smoking = 4;
  familyhistory = 1;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  ngOnInit(): void {


    this.PieChart = new Chart('lineChart', {
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
          position:"bottom"
      }
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // }
      }
    });


  }

  onSelectionChange() {

    console.log("on change event")

    this.PieChart.data.datasets[0].data = [19, 17, 13, 50, 20, 100, 115, 116, 119, 31, 1, 9];
    this.PieChart.update()
  }






}
