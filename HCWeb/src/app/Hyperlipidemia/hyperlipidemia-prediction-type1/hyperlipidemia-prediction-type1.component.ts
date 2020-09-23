import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-hyperlipidemia-prediction-type1',
  templateUrl: './hyperlipidemia-prediction-type1.component.html',
  styleUrls: ['./hyperlipidemia-prediction-type1.component.css']
})
export class HyperlipidemiaPredictionType1Component implements OnInit {

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
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearHyperlipidemiaClass", this.userFormatedValue,
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

  classValueLable = ["Positive", "Negative"];
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
        "L100800": this.user.FPG,
        "L101700": this.user.gammagtp,
        "L100700": this.user.uricacid,
        "S000300": this.user.bmi,
        "L190500": this.user.hct,
        "L190300": this.user.RBC,
        "L101300": this.user.serumGPT,
        "L103300": this.user.cardiacriskfactor,
        "L103100": this.user.HDLcholesterol,
        "AGE": this.user.age,
        "SEX": this.user.sex,
        "FIELD_33": this.user.smoking,
        "FIELD_38": this.user.drinking,
        "FIELD_40": this.user.physicalactivity
      }
    };

    return this.userFormatedValue;
  }


}
