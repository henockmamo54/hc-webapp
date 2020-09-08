import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageApiCallService {

  private REST_API_SERVER = "https://api.github.com/users/diego3g";
  response: any;

  constructor(private httpClient: HttpClient) {

  }

  returntest() {
    return "testMethod"
  }

  handleError(error: HttpErrorResponse) {
    console.log("we have error")
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequestTest() {
    console.log("method called")
    // return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
    this.httpClient.get(this.REST_API_SERVER).subscribe(((response) => {
      this.response = response;
      console.log(response)
    }));
  }


  public sendGetRequest(values: any) {
    console.log("method called")
    // return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
    this.httpClient.post("http://127.0.0.1:5000/predictNextYearDiabeticClass", values,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(((response) => {
        this.response = response;
        console.log("new loaded data", response)
        console.log([response["Class probability"][0]["CLASS 0"], response["Class probability"][0]["CLASS 1"], response["Class probability"][0]["CLASS 2"]]);
      }));

    return this.response;
  }


}
