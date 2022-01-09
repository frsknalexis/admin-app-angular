import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from "../interfaces/register-form.interface";
import { environment } from "../../environments/environment";
import { LoginForm } from "../interfaces/login-form.interface";
import { catchError, map, tap } from "rxjs/operators";
import { LoginResponse } from "../interfaces/login-response.interface";
import { of } from "rxjs";
import {Router} from "@angular/router";

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURIApi: string = environment.baseURIApi;

  public auth2: any;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      console.log('googleInit')
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '878507164345-iq0o07et3kehofv9v6kp9rrbkr5pive4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
      console.log('User signed out.');
    });
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';
    return this.httpClient.get<LoginResponse>(`${ this.baseURIApi }/login/refresh`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((response: LoginResponse) => localStorage.setItem('token', response.token)),
      map((response: LoginResponse) => true),
      catchError((e) => of(false)));
  }

  createUser(registerForm: RegisterForm) {
    return this.httpClient.post(`${ this.baseURIApi }/users`, registerForm)
      .pipe(tap((response: any) => localStorage.setItem('token', response.token)));
  }

  login(loginForm: LoginForm) {
    return this.httpClient.post<LoginResponse>(`${ this.baseURIApi }/login`, loginForm)
      .pipe(tap((response: LoginResponse) => localStorage.setItem('token', response.token)));
  }

  googleSignIn(token: string) {
    return this.httpClient.post<LoginResponse>(`${ this.baseURIApi }/login/google`, { token: token })
      .pipe(tap((response: LoginResponse) => localStorage.setItem('token', response.token)));
  }
}
