import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  private endPoint = '/Accounts';

  createUser(data: RegisterUser) {
    return this.http.post(`${this.apiUrl + this.endPoint}/register`, data);
  }

  loginUser(data: RegisterUser) {
    return this.http.post(`${this.apiUrl + this.endPoint}/login`, data, {
      withCredentials: true,
    });
  }
}
