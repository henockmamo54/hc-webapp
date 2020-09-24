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

  constructor(public httpClient: HttpClient) {

    this.user = new User();
    this.thisyearuservalue = cloneDeep(this.user);
    this.nextyearuservalue = cloneDeep(this.user);
    this.nextyearadjustedvalue = cloneDeep(this.user);



    this.formatuserData(this.user);
    // this.loadHistogramData();
    this.loadNextYearPredictedFeatureValues();

  }

  ngOnInit(): void {
  }



  formatuserData(userdata: User) {

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
        "FIELD_15": this.user.diagnosedWithHighBloodPressure,
        "FIELD_4": this.user.bloodtype,

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
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];


    var percentageValue = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    // this.needleValue = percentageValue;
    this.needleValue =   Math.round((percentageValue + Number.EPSILON))
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
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    this.gaugeLabel_adjustednextyear = this.classValueLable[classvalue];     
    
    var percentageValue= 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.gaugeValue_adjustednextyear = percentageValue;
    this.needleValue =   Math.round((percentageValue + Number.EPSILON))
    this.centralLabel = percentageValue + "%";


  }

  // on value change listeners

  onThisYearValueChanged() {

    this.formatuserData(this.user);
    this.loadNextYearPredictedFeatureValues();

  }

  onPredictedValueAdjusted() {
    console.log("on value adjusted");

    this.formatuserData(this.nextyearadjustedvalue);
    this.loadClasValueForAdjustedNextyearValues()

  }



  findIndexOfBin(bins: any, value: any) {

    for (let i = 0; i < bins.length; i++) {
      if (value < bins[i]) { return i - 1; }
    }
    return bins.length - 1;
  }

}
