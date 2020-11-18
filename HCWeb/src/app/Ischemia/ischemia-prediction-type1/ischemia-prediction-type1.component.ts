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

  testUserData: any;
  selectedPerson: any = 0;


  constructor(public httpClient: HttpClient) {
    this.loadTestData()
    // this.formatuserData(this.user);
    // this.loadHyperlipedemiaPrediction();
  }

  ngOnInit(): void {
  }


  onSelectionChange() {
    this.formatuserData(this.user);
    this.loadHyperlipedemiaPrediction();
  }


  loadHyperlipedemiaPrediction() {

    this.isloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictIschemiaNextYearClass_Direct", this.userFormatedValue,
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

  formatuserData(userdata: User) {

    this.userFormatedValue = {
      "0": {
        "L101700": userdata.gammagtp,
        "S000300": userdata.bmi,
        "L100700": userdata.uricacid,
        "L103300": userdata.cardiacriskfactor,
        "L103100": userdata.HDLcholesterol,
        "L190300": userdata.RBC,
        "L103000": userdata.triglycerides,
        "L190900": userdata.RBCDistributionWidth,
        "L504700": userdata.CEABowelDisease,
        "AGE": userdata.age,
        "SEX": userdata.sex,
        "FIELD_33": userdata.smoking,
        "FIELD_38": userdata.drinking,
        "FIELD_15": userdata.diagnosedWithHighBloodPressure
      }
    };

    return this.userFormatedValue;
  }


  // load test data

  loadTestData() {
    this.httpClient.post("http://127.0.0.1:5000/getIschemiaTestData",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        setTimeout(() => { this.afterloadTestData(response); }, 500);
      }));
  }

  afterloadTestData(response: any) {

    var persons: any = []
    for (var i = 0; i < 20; i++) {
      var p: User = new User();
      p.name = "Person " + (i + 1) + " - " + this.classValueLable[Number(response[i]["CLASS"])];
      p.id = i;

      p.gammagtp = response[i]["L101700"];
      p.bmi = response[i]["S000300"];
      p.uricacid = response[i]["L100700"];
      p.cardiacriskfactor = response[i]["L103300"];
      p.HDLcholesterol = response[i]["L103100"];
      p.RBC = response[i]["L190300"];
      p.triglycerides = response[i]["L103000"];
      p.RBCDistributionWidth = response[i]["L190900"];
      p.CEABowelDisease = response[i]["L504700"];
      p.age = response[i]["AGE"]
      p.sex = response[i]["SEX"];
      p.smoking = response[i]["FIELD_33"];
      p.drinking = response[i]["FIELD_38"];
      p.diagnosedWithHighBloodPressure = response[i]["FIELD_15"];
      p.bloodtype = response[i]["FIELD_4"];
      p.creatinine = response[i]["L100500"];
      p.albumin = response[i]["L100200"];
      p.FPG = response[i]["L100800"];
      p.serumGOT = response[i]["L101200"];
      p.serumGPT = response[i]["L101300"];
      p.alkphosphatse = response[i]["L101600"];
      p.totalCholesterol = response[i]["L102900"];
      p.LDLcholesterol = response[i]["L103200"];
      p.iron = response[i]["L104300"];
      p.TIBC = response[i]["L104400"];
      p.UIBC = response[i]["L104500"];
      p.WBC = response[i]["L190000"];
      p.hemoglobin = response[i]["L190400"];
      p.hct = response[i]["L190500"];
      p.MCV = response[i]["L190600"];
      p.MCH = response[i]["L190700"];
      p.MCHC = response[i]["L190800"];
      p.height = response[i]["S000100"];
      p.SBP = response[i]["S000501"];
      p.DBP = response[i]["S000502"];
      persons[i] = p;

    }

    this.testUserData = persons;
    this.user = this.testUserData[0];

    this.formatuserData(this.user);
    this.loadHyperlipedemiaPrediction();
  }

  newUserSelected() {

    this.user = this.testUserData[this.selectedPerson];
    this.formatuserData(this.user);
    this.loadHyperlipedemiaPrediction();

  }



}
