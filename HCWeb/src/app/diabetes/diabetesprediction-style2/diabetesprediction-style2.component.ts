import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageApiCallService } from 'src/app/manage-api-call.service';
import { User } from '../../user.model'
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-diabetesprediction-style2',
  templateUrl: './diabetesprediction-style2.component.html',
  styleUrls: ['./diabetesprediction-style2.component.css']
})
export class DiabetespredictionStyle2Component implements OnInit {
  user: User;
  thisyearuservalue: User;
  nextyearuservalue: User;
  nextyearadjustedvalue: User;
  diabetesClass = ["Normal", "Prediabetes", "Diabetes"];


  userFormatedValue: any;
  private ma: any;
  isloading: boolean = false;
  statusvalue: any;
  statuspercetage: number;

  gaugeType = "full";
  gaugeAppendText = "%";
  gaugeValue_nextyear = 28.3;
  gaugeValue_adjustednextyear = 28.3;
  gaugeLabel_nextyear = "Normal";
  gaugeLabel_adjustednextyear = "Normal";

  // chart data
  piechartdata: Array<number> = [25, 50, 25];
  age_counts: any;
  age_bin_edges: any;
  fpg_counts: any;
  fpg_bin_edges: any;
  hbalc_counts: any;
  hbalc_bin_edges: any;
  bmi_counts: any;
  bmi_bin_edges: any;
  agebin_index: any;
  fpgbin_index: any;
  hba1cbin_index: any;
  bmibin_index: any;
  isNextYearPredictedValueloading: boolean;



  constructor(private manageapi: ManageApiCallService, public httpClient: HttpClient) {

    this.ma = manageapi;
    this.user = new User();
    this.thisyearuservalue = cloneDeep(this.user);
    this.nextyearuservalue = cloneDeep(this.user);
    this.nextyearadjustedvalue = cloneDeep(this.user);



    this.formatuserData(this.user);
    this.loadData();
    this.loadHistogramData();

    this.loadNextYearPredictedFeatureValues();

  }

  ngOnInit(): void {
  }

  onSelectionChange() {

    this.formatuserData(this.user);
    this.loadData();

    this.age_counts = 0;
    this.fpg_counts = 0;
    this.hbalc_counts = 0;
    this.bmi_counts = 0;

    this.loadHistogramData();

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
        "S000502": userdata.DBP

      }
    };

    return this.userFormatedValue;
  }



  loadClasValueForAdjustedNextyearValues() {

    this.isNextYearPredictedValueloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearDiabeticClass", this.userFormatedValue,
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
    this.gaugeLabel_adjustednextyear = this.diabetesClass[classvalue];

    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];

    this.gaugeValue_adjustednextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);

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

  onThisYearValueChanged() {
 
    this.formatuserData(this.user); 
    this.loadNextYearPredictedFeatureValues();

    
    this.age_counts = 0;
    this.fpg_counts = 0;
    this.hbalc_counts = 0;
    this.bmi_counts = 0;

    this.loadHistogramData();

  }

  onPredictedValueAdjusted() {
    console.log("on value adjusted");

    this.formatuserData(this.nextyearadjustedvalue);
    this.loadClasValueForAdjustedNextyearValues()

  }

  afterNextYearValuePredictionDataReceived(response: any) {

    this.isNextYearPredictedValueloading = false;
    this.nextyearuservalue.FPG = this.user.FPG;

    this.nextyearuservalue.hbalc = response["Next Year Value"][0]["L104600"].toFixed(2);
    this.nextyearuservalue.gammagtp = response["Next Year Value"][0]["L101700"].toFixed(2);
    this.nextyearuservalue.bmi = response["Next Year Value"][0]["S000300"].toFixed(2);
    this.nextyearuservalue.triglycerides = response["Next Year Value"][0]["L103000"].toFixed(2);
    this.nextyearuservalue.uricacid = response["Next Year Value"][0]["L100700"].toFixed(2);
    this.nextyearuservalue.age = response["Next Year Value"][0]["AGE"];
    this.nextyearuservalue.physicalactivity=this.user.physicalactivity;
    this.nextyearuservalue.sex=this.user.sex;
    this.nextyearuservalue.smoking=this.user.smoking;
    this.nextyearuservalue.drinking=this.user.drinking;
    this.nextyearuservalue.familyhistory=this.user.familyhistory;



    var classvalue = response["Class value"][0]["CLASS"];
    this.gaugeLabel_nextyear = this.diabetesClass[classvalue];
    this.gaugeLabel_adjustednextyear = this.diabetesClass[classvalue];




    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];
    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    this.gaugeValue_nextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);
    this.gaugeValue_adjustednextyear = 100 * response["Class probability"][0]["CLASS " + classvalue].toFixed(2);

    this.nextyearadjustedvalue = cloneDeep(this.nextyearuservalue);
  }


  loadData() {

    this.isloading = true;
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearDiabeticClassDirect", this.userFormatedValue,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        setTimeout(() => { this.afterDataReceived(response); }, 500);
      }));

  }



  loadHistogramData() {

    // this.isloading = true;
    this.httpClient.get("http://127.0.0.1:5000/gethistplotData").subscribe(((response) => {
      var response = response;
      this.age_counts = response["age_counts"];
      this.fpg_counts = response["fpg_counts"];
      this.hbalc_counts = response["hbalc_counts"];
      this.bmi_counts = response["bmi_counts"];

      this.agebin_index = this.findIndexOfBin(response["age_bin_edges"], this.user.age);
      this.fpgbin_index = this.findIndexOfBin(response["fpg_bin_edges"], this.user.FPG);
      this.hba1cbin_index = this.findIndexOfBin(response["hbalc_bin_edges"], this.user.hbalc);
      this.bmibin_index = this.findIndexOfBin(response["bmi_bin_edges"], this.user.bmi);

      this.formatBarChartLables(response["age_bin_edges"], response["fpg_bin_edges"], response["hbalc_bin_edges"], response["bmi_bin_edges"]);
    }));

  }

  findIndexOfBin(bins: any, value: any) {

    for (let i = 0; i < bins.length; i++) {
      if (value < bins[i]) { return i - 1; }
    }
    return bins.length - 1;
  }

  formatBarChartLables(agebin: any, fpgbin: any, hbalcbin: any, bmibin: any) {
    var tempagelabel = [];
    var tempfpglabel = [];
    var temphbalclabel = [];
    var tempbmilabel = [];
    for (let i = 0; i < 10; i++) {

      tempagelabel[i] = Math.round(agebin[i]) + " - " + Math.round(agebin[i + 1]);
      tempfpglabel[i] = (fpgbin[i]) + " - " + (fpgbin[i + 1]);
      temphbalclabel[i] = (hbalcbin[i]) + " - " + (hbalcbin[i + 1]);
      tempbmilabel[i] = (bmibin[i]) + " - " + (bmibin[i + 1]);
    }

    this.age_bin_edges = tempagelabel;
    this.fpg_bin_edges = tempfpglabel;
    this.hbalc_bin_edges = temphbalclabel;
    this.bmi_bin_edges = tempbmilabel;

  }

  afterDataReceived(response: any) {
    this.isloading = false;

    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = response["Class probability"][0]["CLASS " + classvalue];

    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    console.log("response test", (this.piechartdata), this.statusvalue, this.statuspercetage)
  }



}
