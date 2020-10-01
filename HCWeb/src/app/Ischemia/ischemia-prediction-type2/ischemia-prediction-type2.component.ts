import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model'
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-ischemia-prediction-type2',
  templateUrl: './ischemia-prediction-type2.component.html',
  styleUrls: ['./ischemia-prediction-type2.component.css']
})
export class IschemiaPredictionType2Component implements OnInit {

  user: User;
  thisyearuservalue: User;
  nextyearuservalue: User;
  nextyearadjustedvalue: User;
  classValueLable = ["Negative", "Positive"];


  public canvasWidth = 300;
  public needleValue = 90
  public centralLabel = '65% '
  public name = ''
  public bottomLabel = ''
  public options = {
    hasNeedle: false,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#4db6ac', 'lightgray'],
    arcDelimiters: [65,],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  }



  userFormatedValue: any;
  isloading: boolean = false;
  statusvalue: any;
  statuspercetage: number;

  gaugeType = "full";
  gaugeAppendText = "%";
  gaugeValue_nextyear = 28.3;
  gaugeValue_adjustednextyear = 28.3;
  gaugeLabel_nextyear = "Normal";
  gaugeLabel_adjustednextyear = "Normal";
  gauge_nextyearforegroundColor = "rgba(0, 150, 136, 1)";
  gauge_adjustednextyearforegroundColor = "rgba(0, 150, 136, 1)";

  // chart data
  isNextYearPredictedValueloading: boolean;
  testUserData: any;
  selectedPerson: any = 0;

  constructor(public httpClient: HttpClient) {

    this.user = new User();
    this.thisyearuservalue = cloneDeep(this.user);
    this.nextyearuservalue = cloneDeep(this.user);
    this.nextyearadjustedvalue = cloneDeep(this.user);



    this.loadTestData()
    // this.formatuserData(this.user); 
    // this.loadNextYearPredictedFeatureValues();

  }

  ngOnInit(): void {
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
        "FIELD_15": userdata.diagnosedWithHighBloodPressure,
        "FIELD_4": userdata.bloodtype,
        "L100500": userdata.creatinine,
        "L100200": userdata.albumin,
        "L100800": userdata.FPG,
        "L101200": userdata.serumGOT,
        "L101300": userdata.serumGPT,
        "L101600": userdata.alkphosphatse,
        "L102900": userdata.totalCholesterol,
        "L103200": userdata.LDLcholesterol,
        "L104300": userdata.iron,
        "L104400": userdata.TIBC,
        "L104500": userdata.UIBC,
        "L190000": userdata.WBC,
        "L190400": userdata.hemoglobin,
        "L190500": userdata.hct,
        "L190600": userdata.MCV,
        "L190700": userdata.MCH,
        "L190800": userdata.MCHC,
        "S000100": userdata.height,
        "S000501": userdata.SBP,
        "S000502": userdata.DBP,

      }
    };

    return this.userFormatedValue;
  }


  loadNextYearPredictedFeatureValues() {

    this.isNextYearPredictedValueloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictIschemiaNextYearValue", this.userFormatedValue,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        setTimeout(() => { this.afterNextYearValuePredictionDataReceived(response); }, 500);
      }));
  }

  afterNextYearValuePredictionDataReceived(response: any) {

    this.isNextYearPredictedValueloading = false;

    this.nextyearuservalue.gammagtp = response["Next Year Value"][0]["L101700"].toFixed(2);
    this.nextyearuservalue.bmi = response["Next Year Value"][0]["S000300"].toFixed(2);
    this.nextyearuservalue.uricacid = response["Next Year Value"][0]["L100700"].toFixed(2);
    this.nextyearuservalue.cardiacriskfactor = response["Next Year Value"][0]["L103300"].toFixed(2);
    this.nextyearuservalue.HDLcholesterol = response["Next Year Value"][0]["L103100"].toFixed(2);
    this.nextyearuservalue.RBC = response["Next Year Value"][0]["L190300"].toFixed(2);
    this.nextyearuservalue.triglycerides = response["Next Year Value"][0]["L103000"].toFixed(2);
    this.nextyearuservalue.RBCDistributionWidth = response["Next Year Value"][0]["L190900"].toFixed(2);
    this.nextyearuservalue.CEABowelDisease = response["Next Year Value"][0]["L504700"].toFixed(2);
    this.nextyearuservalue.age = response["Next Year Value"][0]["AGE"];
    this.nextyearuservalue.diagnosedWithHighBloodPressure = response["Next Year Value"][0]["FIELD_15"];
    this.nextyearuservalue.sex = this.user.sex;
    this.nextyearuservalue.smoking = this.user.smoking;
    this.nextyearuservalue.drinking = this.user.drinking;



    var classvalue = response["Class value"][0]["CLASS"];
    this.gaugeLabel_nextyear = this.classValueLable[classvalue];
    this.gaugeLabel_adjustednextyear = this.classValueLable[classvalue];




    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.classValueLable[classvalue];
    this.statuspercetage = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(1));


    var percentageValue = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    // this.needleValue = percentageValue;
    this.needleValue = Math.round((percentageValue + Number.EPSILON))
    this.centralLabel = percentageValue + "%";
    this.gaugeValue_nextyear = percentageValue;
    this.gaugeValue_adjustednextyear = percentageValue;

    // this.nextyearadjustedvalue = cloneDeep(this.nextyearuservalue);
  }

  loadClasValueForAdjustedNextyearValues() {

    this.isNextYearPredictedValueloading = true;
    //predictNextYearDiabeticClass
    this.httpClient.post("http://127.0.0.1:5000/predictIschemiaNextYearClass", this.userFormatedValue,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        setTimeout(() => { this.afterpredictClasValueForAdjustedNextyearValues(response); }, 500);
      }));
  }

  afterpredictClasValueForAdjustedNextyearValues(response: any) {

    this.isNextYearPredictedValueloading = false;

    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.classValueLable[classvalue];
    this.statuspercetage = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(1));
    this.gaugeLabel_adjustednextyear = this.classValueLable[classvalue];

    var percentageValue = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.gaugeValue_adjustednextyear = percentageValue;
    this.needleValue = Math.round((percentageValue + Number.EPSILON))
    this.centralLabel = percentageValue + "%";
    this.options.arcDelimiters = [percentageValue,]


  }

  // on value change listeners

  onThisYearValueChanged() {

    this.formatuserData(this.user);
    this.loadNextYearPredictedFeatureValues();

  }

  onPredictedValueAdjusted() {

    this.formatuserData(this.nextyearadjustedvalue);
    this.loadClasValueForAdjustedNextyearValues()

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
    this.loadNextYearPredictedFeatureValues();




  }

  newUserSelected() {

    this.user = this.testUserData[this.selectedPerson];


    this.formatuserData(this.user);

    this.loadNextYearPredictedFeatureValues();

  } 

}
