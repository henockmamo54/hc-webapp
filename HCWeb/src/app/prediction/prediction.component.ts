import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})



export class PredictionComponent implements OnInit {

  constructor() { }
 
  FPG=150;
  hbalc=6.8;
  gammagtp=78;
  bmi=15;
  triglycerides=25;
  age=28;
  uricacid=5.5;
  sex=0;
  physicalactivity=5
  drinking=2;
  smoking=4;
  familyhistory=1;

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
  }

  onSelectionChange(){

    console.log("on change event")

  }

}
