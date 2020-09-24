import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model'
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-hyperlipidemia-prediction-type2',
  templateUrl: './hyperlipidemia-prediction-type2.component.html',
  styleUrls: ['./hyperlipidemia-prediction-type2.component.css']
})
export class HyperlipidemiaPredictionType2Component implements OnInit {user: User;
  thisyearuservalue: User;
  nextyearuservalue: User;
  nextyearadjustedvalue: User;
  classValueLable = ["Negative", "Positive"];
  diabetesClass_colors = ["rgb(156,204,102)", "rgb(39,166,154)", "rgb(70,91,101)"];


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
    this.loadNextYearPredictedFeatureValues();

  }

  ngOnInit(): void {
  }


  formatuserData(userdata: User) {

    this.userFormatedValue = {
      "0": {

        "L100800": userdata.FPG,
        "L101700": userdata.gammagtp,
        "L100700": userdata.uricacid,
        "S000300": userdata.bmi,
        "L190500": userdata.hct,
        "L190300": userdata.RBC,
        "L101300": userdata.serumGPT,
        "L103300": userdata.cardiacriskfactor,
        "L103100": userdata.HDLcholesterol,
        "AGE": userdata.age,
        "SEX": userdata.sex,
        "FIELD_33": userdata.smoking,
        "FIELD_38": userdata.drinking,
        "FIELD_40": userdata.physicalactivity,             
        "L100500": userdata.creatinine,
        "L101200": userdata.serumGOT, 
        "L102900": userdata.totalCholesterol,         
        "L103000": userdata.triglycerides, 
        "L103200": userdata.LDLcholesterol, 
        "L104500": userdata.UIBC,  
        "L104600": userdata.hbalc, 
        "L190400": userdata.hemoglobin,
        "S000100": userdata.height, 
        "S000501": userdata.SBP,
        "S000502": userdata.DBP,
        "L190800": userdata.MCHC


      }
    };

    return this.userFormatedValue;
  }


  loadNextYearPredictedFeatureValues() {

    this.isNextYearPredictedValueloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictHyperlipidemiaNextYearValue", this.userFormatedValue,
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
    this.nextyearuservalue.gammagtp = response["Next Year Value"][0]["L101700"].toFixed(2);
    this.nextyearuservalue.uricacid = response["Next Year Value"][0]["L100700"].toFixed(2);
    this.nextyearuservalue.bmi = response["Next Year Value"][0]["S000300"].toFixed(2);
    this.nextyearuservalue.hct = response["Next Year Value"][0]["L190500"].toFixed(2);
    this.nextyearuservalue.RBC = response["Next Year Value"][0]["L190300"].toFixed(2);
    this.nextyearuservalue.serumGPT = response["Next Year Value"][0]["L101300"].toFixed(2);
    this.nextyearuservalue.cardiacriskfactor = response["Next Year Value"][0]["L103300"].toFixed(2);
    this.nextyearuservalue.HDLcholesterol = response["Next Year Value"][0]["L103100"].toFixed(2);
    this.nextyearuservalue.age = response["Next Year Value"][0]["AGE"];
    this.nextyearuservalue.sex = this.user.sex;
    this.nextyearuservalue.physicalactivity = this.user.physicalactivity;
    this.nextyearuservalue.smoking = this.user.smoking;
    this.nextyearuservalue.drinking = this.user.drinking; 



    var classvalue = response["Class value"][0]["CLASS"];
    this.gaugeLabel_nextyear = this.classValueLable[classvalue];
    this.gauge_nextyearforegroundColor = this.diabetesClass_colors[classvalue];

    this.gaugeLabel_adjustednextyear = this.classValueLable[classvalue];
    this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];




    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.classValueLable[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    // this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    this.gaugeValue_nextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.gaugeValue_adjustednextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);

    this.nextyearadjustedvalue = cloneDeep(this.nextyearuservalue);
  }

  loadClasValueForAdjustedNextyearValues() {

    this.isNextYearPredictedValueloading = true;
    //predictNextYearDiabeticClass
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearHyperlipidemiaClass", this.userFormatedValue,
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

    console.log("*************/////////*/*/*/*/*/*/*",this.userFormatedValue,response);

    this.isNextYearPredictedValueloading = false;

    var classvalue = response["Class value"][0]["CLASS"];
    this.gaugeLabel_adjustednextyear = this.classValueLable[classvalue];
    this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];

    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.classValueLable[classvalue];
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
    console.log("on value adjusted",this.nextyearadjustedvalue);

    this.formatuserData(this.nextyearadjustedvalue);
    this.loadClasValueForAdjustedNextyearValues()

  }  

}
