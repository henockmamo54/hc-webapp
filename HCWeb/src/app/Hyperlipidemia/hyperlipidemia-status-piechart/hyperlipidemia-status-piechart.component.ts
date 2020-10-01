import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-hyperlipidemia-status-piechart',
  templateUrl: './hyperlipidemia-status-piechart.component.html',
  styleUrls: ['./hyperlipidemia-status-piechart.component.css']
})
export class HyperlipidemiaStatusPiechartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input("data") piechartdata: any;
  @ViewChild('mycanvas') canvas: ElementRef;
  @Input("id") id: any;
  PieChart: any = [];
  pichartLabels: any = ["Negative", "Positive"];


  constructor() { }


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
      type: 'doughnut',
      data: {
        labels: this.pichartLabels,
        datasets: [{
          label: '%',
          data: this.piechartdata,
          backgroundColor: [
            '#9CCC66',
            '#27A69A',
            '#465B65',
          ],
          borderColor: [
            '#82ab54',
            '#1d7d74',
            '#314047',
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
          duration: 1000
        },

        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index] + ": " +
                (Number(data.datasets[0].data[tooltipItem.index]) * 100).toFixed(2) + "%";
            }
          }
        }

      }
    });

  }

}
