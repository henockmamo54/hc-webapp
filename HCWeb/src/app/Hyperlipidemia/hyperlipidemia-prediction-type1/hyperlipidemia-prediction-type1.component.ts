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


  testUserData: any;
  selectedPerson: any = 0;


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
    this.loadTestData();
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



  loadTestData() {
    this.httpClient.post("http://127.0.0.1:5000/getHyperlipidemiaTestData",
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

      p.age = response[i]["AGE"];
      p.drinking = response[i]["FIELD_38"];
      p.creatinine = response[i]["L100500"];
      p.uricacid = response[i]["L100700"];
      p.FPG = response[i]["L100800"];
      p.serumGOT = response[i]["L101200"];
      p.serumGPT = response[i]["L101300"];
      p.gammagtp = response[i]["L101700"];
      p.totalCholesterol = response[i]["L102900"];
      p.triglycerides = response[i]["L103000"];
      p.totalCholesterol = response[i]["L103100"];
      p.cardiacriskfactor = response[i]["L103300"];
      p.UIBC = response[i]["L104500"];
      p.hbalc = response[i]["L104600"];
      p.RBC = response[i]["L190300"];
      p.hemoglobin = response[i]["L190400"];
      p.hct = response[i]["L190500"];
      p.MCHC = response[i]["L190800"];
      p.height = response[i]["S000100"];
      p.bmi = response[i]["S000300"];
      p.SBP = response[i]["S000501"];
      p.DBP = response[i]["S000502"];
      p.sex = response[i]["SEX"];
      persons[i] = p;

    }

    this.testUserData = persons;
    console.log(persons, '//////////////***********////////////////////////', response[0].length, 54544, response[0])
    this.user = this.testUserData[0];


    this.formatuserData();
    this.loadHyperlipedemiaPrediction();




  }

  newUserSelected() {

    this.user = this.testUserData[this.selectedPerson];


    this.formatuserData();
    this.loadHyperlipedemiaPrediction();

  }





}
