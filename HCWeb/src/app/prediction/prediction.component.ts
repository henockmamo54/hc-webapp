import { Component, OnInit } from '@angular/core';
import {User} from '../user.model'



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})



export class PredictionComponent implements OnInit {

  user: User;
  piechartdata: any;

  constructor() {


  }

  ngOnInit(): void {
    this.user = {
      FPG: 150,
      hbalc: 6.8,
      gammagtp: 78,
      bmi: 15,
      triglycerides: 25,
      age: 28,
      uricacid: 5.5,
      sex: 0,
      physicalactivity: 5,
      drinking: 2,
      smoking: 4,
      familyhistory: 1

    }

    this.piechartdata = [25, 50, 25]

  }

  onSelectionChange() {

    console.log("on change event", Math.random() * 100)

    var d = Math.random() * 100
    var pd = Math.random() * 100
    var n = Math.random() * 100

    var sum = d + pd + n;
    this.piechartdata = [d / sum, pd / sum, n / sum]

  }

}
