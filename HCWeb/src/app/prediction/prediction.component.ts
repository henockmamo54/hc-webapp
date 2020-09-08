import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { ManageApiCallService } from '../manage-api-call.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})



export class PredictionComponent implements OnInit {

  user: User;
  piechartdata: any = [25, 50, 25];
  userFormatedValue: any;
  private ma: any;
  isloading: boolean;



  constructor(private manageapi: ManageApiCallService, public httpClient: HttpClient) {

    this.ma = manageapi;
    this.user = {
      FPG: 150,
      hbalc: 6.8,
      gammagtp: 78,
      bmi: 15,
      triglycerides: 25,
      age: 28,
      uricacid: 5.5,
      sex: 0,
      physicalactivity: 5,
      drinking: 2,
      smoking: 4,
      familyhistory: 1

    }


  }

  ngOnInit(): void {


  }

  onSelectionChange() {

    this.formatuserData();
    this.loadData();

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
    
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearDiabeticClass", this.userFormatedValue,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        var response = response;
        console.log([response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]]);
        this.piechartdata = [response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]] 
      }));

  }

}
