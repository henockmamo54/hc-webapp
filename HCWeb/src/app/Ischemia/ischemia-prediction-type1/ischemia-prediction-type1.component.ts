import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-ischemia-prediction-type1',
  templateUrl: './ischemia-prediction-type1.component.html',
  styleUrls: ['./ischemia-prediction-type1.component.css']
})
export class IschemiaPredictionType1Component implements OnInit {

  user: User = new User();
  isloading: boolean;
  userFormatedValue: any;

  status = "Normal"
  public canvasWidth = 300;
  public needleValue = 45
  public centralLabel = '65% '
  public name = ''
  public bottomLabel = ''
  public options = {
    hasNeedle: false,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#4db6ac', 'lightgray'],
    arcDelimiters: [73,],
    rangeLabel: ['0', '100'],
    needleStartValue: 96,
  }


  constructor(public httpClient: HttpClient) {

    this.formatuserData();
    this.loadHyperlipedemiaPrediction();
  }

  ngOnInit(): void {
  }


  onSelectionChange() {
    this.formatuserData();
    this.loadHyperlipedemiaPrediction();
  }


  loadHyperlipedemiaPrediction() {

    this.isloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictIschemiaNextYearClass", this.userFormatedValue,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        console.log("response", response)
        setTimeout(() => { this.afterDataReceived(response); }, 500);
      }));


  }

  classValueLable = ["Negative", "Positive"];
  afterDataReceived(response: Object) {
    this.isloading = false;
    var classvalue = response["Class value"][0]["CLASS"];
    this.status = this.classValueLable[classvalue];
    this.needleValue = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.centralLabel = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2) + "%";

  }

  formatuserData() {

    this.userFormatedValue = {
      "0": { 
        "L101700": this.user.gammagtp,
        "S000300": this.user.bmi, 
        "L100700": this.user.uricacid,
        "L103300": this.user.cardiacriskfactor,
        "L103100": this.user.HDLcholesterol,
        "L190300": this.user.RBC,
        "L103000": this.user.triglycerides,
        "L190900": this.user.RBCDistributionWidth,
        "L504700": this.user.CEABowelDisease,
        "AGE": this.user.age,
        "SEX": this.user.sex,
        "FIELD_33": this.user.smoking,
        "FIELD_38": this.user.drinking,
        "FIELD_15": this.user.diagnosedWithHighBloodPressure
      }
    };

    return this.userFormatedValue;
  }


}
