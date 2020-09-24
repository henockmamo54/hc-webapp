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



        
        "L100800": userdata.FPG,
        "L104600": userdata.hbalc,
        "L100700": userdata.uricacid,
        "S000300": userdata.bmi,
        "L103000": userdata.triglycerides,
        "AGE": userdata.age,
        "L101700": userdata.gammagtp,
        "SEX": userdata.sex,
        "FIELD_31": userdata.familyhistory,
        "FIELD_33": userdata.smoking,
        "FIELD_38": userdata.drinking,
        "FIELD_40": userdata.physicalactivity,
        "L100500": userdata.creatinine,
        "L101200": userdata.serumGOT,
        "L101300": userdata.serumGPT,
        "L101600": userdata.alkphosphatse,
        "L103100": userdata.HDLcholesterol,
        "L103300": userdata.cardiacriskfactor,
        "L107400": userdata.BUNCREAratio,
        "L190000": userdata.WBC,
        "L190300": userdata.RBC,
        "L190400": userdata.hemoglobin,
        "S000100": userdata.height,
        "S000501": userdata.SBP,
        "S000502": userdata.DBP,
        "L190500": userdata.hct,

      }
    };

    return this.userFormatedValue;
  }


  loadNextYearPredictedFeatureValues() {

    this.isNextYearPredictedValueloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictDiabeticNextYearValue", this.userFormatedValue,
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

    this.nextyearuservalue.FPG = response["Next Year Value"][0]["L100800"].toFixed(2);
    this.nextyearuservalue.hbalc = response["Next Year Value"][0]["L104600"].toFixed(2);
    this.nextyearuservalue.gammagtp = response["Next Year Value"][0]["L101700"].toFixed(2);
    this.nextyearuservalue.bmi = response["Next Year Value"][0]["S000300"].toFixed(2);
    this.nextyearuservalue.triglycerides = response["Next Year Value"][0]["L103000"].toFixed(2);
    this.nextyearuservalue.uricacid = response["Next Year Value"][0]["L100700"].toFixed(2);
    this.nextyearuservalue.age = response["Next Year Value"][0]["AGE"];
    this.nextyearuservalue.physicalactivity = this.user.physicalactivity;
    this.nextyearuservalue.sex = this.user.sex;
    this.nextyearuservalue.smoking = this.user.smoking;
    this.nextyearuservalue.drinking = this.user.drinking;
    this.nextyearuservalue.familyhistory = this.user.familyhistory;



    var classvalue = response["Class value"][0]["CLASS"];
    // this.gaugeLabel_nextyear = this.diabetesClass[classvalue];
    // this.gauge_nextyearforegroundColor = this.diabetesClass_colors[classvalue];

    // this.gaugeLabel_adjustednextyear = this.diabetesClass[classvalue];
    // this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];




    var classvalue = response["Class value"][0]["CLASS"];
    // this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    // this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    this.gaugeValue_nextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.gaugeValue_adjustednextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);

    this.nextyearadjustedvalue = cloneDeep(this.nextyearuservalue);
  }

  loadClasValueForAdjustedNextyearValues() {

    this.isNextYearPredictedValueloading = true;
    //predictNextYearDiabeticClass
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearDiabeticClassDirect", this.userFormatedValue,
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
    // this.gaugeLabel_adjustednextyear = this.diabetesClass[classvalue];
    // this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];

    var classvalue = response["Class value"][0]["CLASS"];
    // this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    // this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];

    this.gaugeValue_adjustednextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);


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
