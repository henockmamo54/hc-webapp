import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HCWeb';



  constructor(public httpClient: HttpClient) {
  }


}
