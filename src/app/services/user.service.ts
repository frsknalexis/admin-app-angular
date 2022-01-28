import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from "../interfaces/register-form.interface";
import { environment } from "../../environments/environment";
import { LoginForm } from "../interfaces/login-form.interface";
import { catchError, map, tap } from "rxjs/operators";
import { LoginResponse } from "../interfaces/login-response.interface";
import { of } from "rxjs";
import {Router} from "@angular/router";
import { User } from "../models/user.model";
import {UserResponse} from "../interfaces/user-response.interface";
import {LoadUsers} from "../interfaces/load-users.interface";

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURIApi: string = environment.baseURIApi;

  public auth2: any;

  // @ts-ignore
  public user: User;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get userId(): string {
    return this.user.userId || '';
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
    return this.httpClient.get<LoginResponse>(`${ this.baseURIApi }/login/refresh`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((response: LoginResponse) => {
        // @ts-ignore
        const { email, google, image = '', name, role, userId } = response.user;
        this.user = new User(name, email,'', google, image, userId, role);
        localStorage.setItem('token', response.token)
        return true;
      }), catchError((e) => of(false)));
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

  updateProfile(data: { name: string, email: string }) {
    const userRequest = {
      name: data.name,
      email: data.email,
      role: this.user.role
    };

    return this.httpClient.put<UserResponse>(`${ this.baseURIApi }/users/${ this.userId }`,
      userRequest, {
      headers: {
        'x-token': this.token
      }
    });
  }

  loadUsers(from: number = 0, to: number = 10) {
    return this.httpClient.get<LoadUsers>(`${ this.baseURIApi }/users?from=${ from }&to=${ to }`,
      {
        headers: {
          'x-token': this.token
        }
      }).pipe(
        map((response: LoadUsers) => {
          const users = response.users
            .map((user) => new User(user.name, user.email, '',
              user.google, user.image, user.userId, user.role));

          return {
            ok: response.ok,
            users,
            total: response.total
          }
        }));
  }

  deleteUser(user: User) {
    return this.httpClient.delete(`${ this.baseURIApi }/users/${ user.userId }`,
      {
        headers: {
          'x-token': this.token
        }
      });
  }

  updateUser(user: User) {
    return this.httpClient.put<UserResponse>(`${ this.baseURIApi }/users/${ user.userId }`, user,
      {
        headers: {
          'x-token': this.token
        }
      });
  }
}
