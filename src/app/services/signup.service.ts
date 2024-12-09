

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'  
})
export class SignupService {
  private apiUrl = 'http://localhost:8081/api/v1/users';  // Your backend API endpoint

  constructor(private http: HttpClient) {}

  signup(signupData: SignupModel): Observable<any> {
    return this.http.post(this.apiUrl, signupData);  // Sends POST request to the backend
  }
}
