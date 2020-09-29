import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model'
import { ManageApiCallService } from '../../manage-api-call.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-diabetesprediction-style1',
  templateUrl: './diabetesprediction-style1.component.html',
  styleUrls: ['./diabetesprediction-style1.component.css']
})
export class DiabetespredictionStyle1Component implements OnInit {

  user: User;
  userFormatedValue: any;
  private ma: any;
  isloading: boolean = false;
  statusvalue: any;
  statuspercetage: number;

  
  diabetesTestUserData: any;
  selectedPerson = 0;

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



  constructor(private manageapi: ManageApiCallService, public httpClient: HttpClient) {

    this.ma = manageapi;
    this.user = new User(); 

    
    this.loadDiabtesTestData()
    
    // this.formatuserData();
    // this.loadData();
    // this.loadHistogramData();

  }

  ngOnInit(): void {
  }

  onSelectionChange() {

    this.formatuserData();
    this.loadData();

    this.age_counts = 0;
    this.fpg_counts = 0;
    this.hbalc_counts = 0;
    this.bmi_counts = 0;

    this.loadHistogramData();

  }

  formatuserData() {

    this.userFormatedValue = {
      "0": {
        "L100800": this.user.FPG,
        "L104600": this.user.hbalc,
        "L100700": this.user.uricacid,
        "S000300": this.user.bmi,
        "L103000": this.user.triglycerides,
        "AGE": this.user.age,
        "L101700": this.user.gammagtp,
        "SEX": this.user.sex,
        "FIELD_31": this.user.familyhistory,
        "FIELD_33": this.user.smoking,
        "FIELD_38": this.user.drinking,
        "FIELD_40": this.user.physicalactivity

      }
    };

    return this.userFormatedValue;
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
        console.log("response", response)
        setTimeout(() => { this.afterDataReceived(response); }, 500);
      }));

  }



  loadHistogramData() {

    // this.isloading = true;
    this.httpClient.get("http://127.0.0.1:5000/gethistplotData").subscribe(((response) => {
      var response = response;
      console.log("temp data temp data", response);
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

    // console.log(this.age_bin_edges , "this.age_bin_edges ")
  }

  diabetesClass = ["Normal", "Prediabetes", "Diabetes"];
  afterDataReceived(response: any) {
    this.isloading = false;
    
    var classvalue=response["Class value"][0]["CLASS"];
    this.statusvalue=this.diabetesClass[classvalue];    
    this.statuspercetage= response["Class probability"][0]["CLASS "+classvalue];

    this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]];


    console.log("response test",(this.piechartdata),this.statusvalue,this.statuspercetage)
  }

  

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


  
    this.formatuserData();
    this.loadData();
    this.loadHistogramData();




  }

  newUserSelected() {

    this.user = this.diabetesTestUserData[this.selectedPerson]; 

    this.formatuserData();
    this.loadData();
    this.loadHistogramData();

  }


}
