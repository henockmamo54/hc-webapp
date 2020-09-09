import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-final-prediction-header-value',
  templateUrl: './final-prediction-header-value.component.html',
  styleUrls: ['./final-prediction-header-value.component.css']
})
export class FinalPredictionHeaderValueComponent implements OnInit, AfterViewInit {
  PieChart: Chart;
  @ViewChild('canvas23') canvas23: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

    // pie chart:
    this.PieChart = new Chart('dchart', {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Bar Chart",
          display: true
        },
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

  ngAfterViewInit(): void {
    var ctx = this.canvas23.nativeElement.getContext('2d');
    console.log("henock ", this.canvas23, ctx)

  }

}
