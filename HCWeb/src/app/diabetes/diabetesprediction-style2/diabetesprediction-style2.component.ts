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
  diabetesClass_colors = ["rgb(156,204,102)", "rgb(39,166,154)", "rgb(70,91,101)"];

  diabetesTestUserData: any;
  selectedPerson = 0;


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
  gauge_nextyearforegroundColor = "rgb(156,204,102)";
  gauge_adjustednextyearforegroundColor = "rgb(156,204,102)";

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



  constructor(public httpClient: HttpClient) {

    this.user = new User();
    this.thisyearuservalue = cloneDeep(this.user);
    this.nextyearuservalue = cloneDeep(this.user);
    this.nextyearadjustedvalue = cloneDeep(this.user);

    this.loadDiabtesTestData()


    // this.formatuserData(this.user);
    // this.loadHistogramData();

    // this.loadNextYearPredictedFeatureValues();

  }

  ngOnInit(): void {
  }


  formatuserData(userdata: User) {

    this.userFormatedValue = {
      "0": {
        "L100800": Number(userdata.FPG),
        "L104600": Number(userdata.hbalc),
        "L100700": Number(userdata.uricacid),
        "S000300": Number(userdata.bmi),
        "L103000": Number(userdata.triglycerides),
        "AGE": Number(userdata.age),
        "L101700": Number(userdata.gammagtp),
        "SEX": Number(userdata.sex),
        "FIELD_31": Number(userdata.familyhistory),
        "FIELD_33": Number(userdata.smoking),
        "FIELD_38": Number(userdata.drinking),
        "FIELD_40": Number(userdata.physicalactivity),
        "L100500": Number(userdata.creatinine),
        "L101200": Number(userdata.serumGOT),
        "L101300": Number(userdata.serumGPT),
        "L101600": Number(userdata.alkphosphatse),
        "L103100": Number(userdata.HDLcholesterol),
        "L103300": Number(userdata.cardiacriskfactor),
        "L107400": Number(userdata.BUNCREAratio),
        "L190000": Number(userdata.WBC),
        "L190300": Number(userdata.RBC),
        "L190400": Number(userdata.hemoglobin),
        "S000100": Number(userdata.height),
        "S000501": Number(userdata.SBP),
        "S000502": Number(userdata.DBP),
        "L190500": Number(userdata.hct),

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

    this.nextyearuservalue.FPG = response["Next Year Value"][0]["fasting glucose"].toFixed(1);
    this.nextyearuservalue.hbalc = response["Next Year Value"][0]["HBA1C"].toFixed(1);
    this.nextyearuservalue.gammagtp = response["Next Year Value"][0]["r-GTP gamma"].toFixed(1);
    this.nextyearuservalue.bmi = response["Next Year Value"][0]["BMI"].toFixed(1);
    this.nextyearuservalue.triglycerides = response["Next Year Value"][0]["Triglycerides"].toFixed(1);
    this.nextyearuservalue.uricacid = response["Next Year Value"][0]["Uric Acid"].toFixed(1);
    this.nextyearuservalue.age = response["Next Year Value"][0]["AGE"];
    this.nextyearuservalue.physicalactivity = this.user.physicalactivity;
    this.nextyearuservalue.sex = this.user.sex;
    this.nextyearuservalue.smoking = this.user.smoking;
    this.nextyearuservalue.drinking = this.user.drinking;
    this.nextyearuservalue.familyhistory = this.user.familyhistory;



    var classvalue = response["Class value"][0]["CLASS"];
    this.gaugeLabel_nextyear = this.diabetesClass[classvalue];
    this.gauge_nextyearforegroundColor = this.diabetesClass_colors[classvalue];

    this.gaugeLabel_adjustednextyear = this.diabetesClass[classvalue];
    this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];


    var classvalue = response["Class value"][0]["CLASS"];
    this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(2));
    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    this.gaugeValue_nextyear = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(2));
    this.gaugeValue_adjustednextyear = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(2));

    this.nextyearadjustedvalue = cloneDeep(this.nextyearuservalue);
  }

  loadClasValueForAdjustedNextyearValues() {

    this.isNextYearPredictedValueloading = true;

    var tempval = {
      // "0": this.formatuserData(this.nextyearadjustedvalue),
      "0": this.formatuserData(this.nextyearadjustedvalue),
      "1": this.formatuserData(this.user)
    } 


    //predictNextYearDiabeticClass
    this.httpClient.post("http://127.0.0.1:5000/predictDiabeticClassForAdustedValues", tempval,
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
    this.gauge_adjustednextyearforegroundColor = this.diabetesClass_colors[classvalue];

    this.statusvalue = this.diabetesClass[classvalue];
    this.statuspercetage = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(2));
    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];

    this.gaugeValue_adjustednextyear = Number((100 * response["Class probability"][0]["CLASS " + classvalue]).toFixed(2));


  }

  // on value change listeners

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

    this.formatuserData(this.nextyearadjustedvalue);
    this.loadClasValueForAdjustedNextyearValues()
    this.loadHistogramData();

  }

  // histogram plot data
  loadHistogramData() {

    // this.isloading = true;
    this.httpClient.get("http://127.0.0.1:5000/gethistplotData").subscribe(((response) => {
      var response = response;
      this.age_counts = response["age_counts"];
      this.fpg_counts = response["fpg_counts"];
      this.hbalc_counts = response["hbalc_counts"];
      this.bmi_counts = response["bmi_counts"];

      this.agebin_index = this.findIndexOfBin(response["age_bin_edges"], this.nextyearadjustedvalue.age);
      this.fpgbin_index = this.findIndexOfBin(response["fpg_bin_edges"], this.nextyearadjustedvalue.FPG);
      this.hba1cbin_index = this.findIndexOfBin(response["hbalc_bin_edges"], this.nextyearadjustedvalue.hbalc);
      this.bmibin_index = this.findIndexOfBin(response["bmi_bin_edges"], this.nextyearadjustedvalue.bmi);

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


  // load test data
  loadDiabtesTestData() {
    this.httpClient.post("http://127.0.0.1:5000/getDiabetesTestData",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        setTimeout(() => { this.afterloadDiabtesTestData(response); }, 500);
      }));
  }

  afterloadDiabtesTestData(response: any) {


    var persons: any = []
    for (var i = 0; i < 30; i++) {
      var p: User = new User();
      p.name = "Person " + (i + 1) + " - " + this.diabetesClass[Number(response[i]["CLASS"])];
      p.id = i;
      p.age = response[i]["AGE"];
      p.familyhistory = response[i]["FIELD_31"];
      p.smoking = response[i]["FIELD_33"];
      p.drinking = response[i]["FIELD_38"];
      p.physicalactivity = response[i]["FIELD_40"];
      p.creatinine = response[i]["L100500"];
      p.uricacid = response[i]["L100700"];
      p.FPG = response[i]["L100800"];
      p.serumGOT = response[i]["L101200"];
      p.serumGPT = response[i]["L101300"];
      p.alkphosphatse = response[i]["L101600"];
      p.gammagtp = response[i]["L101700"];
      p.triglycerides = response[i]["L103000"];
      p.HDLcholesterol = response[i]["L103100"];
      p.cardiacriskfactor = response[i]["L103300"];
      p.hbalc = response[i]["L104600"];
      p.BUNCREAratio = response[i]["L107400"];
      p.WBC = response[i]["L190000"];
      p.RBC = response[i]["L190300"];
      p.hemoglobin = response[i]["L190400"];
      p.height = response[i]["S000100"];
      p.bmi = response[i]["S000300"];
      p.SBP = response[i]["S000501"];
      p.DBP = response[i]["S000502"];
      p.sex = response[i]["SEX"];
      persons[i] = p;
    }

    this.diabetesTestUserData = persons;
    this.user = this.diabetesTestUserData[0];


    this.formatuserData(this.user);
    this.loadHistogramData();

    this.loadNextYearPredictedFeatureValues();




  }

  newUserSelected() {

    this.user = this.diabetesTestUserData[this.selectedPerson];


    this.formatuserData(this.user);
    this.loadHistogramData();

    this.loadNextYearPredictedFeatureValues();

  }




}
