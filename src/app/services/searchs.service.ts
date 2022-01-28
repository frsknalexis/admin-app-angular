import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  private baseURIApi: string = environment.baseURIApi;

  constructor(private httpClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private convertToUsers(result: any[]): User[] {
    return result.map((user) => new User(user.name, user.email, '',
      user.google, user.image, user.userId, user.role));
  }

  searchUsers(type: string, searchText: string) {
    return this.httpClient.get<any[]>(`${ this.baseURIApi }/search/${ type }/${ searchText }`,
      this.headers)
      .pipe(
        map((response: any) => {
          switch (type) {
            case 'users':
              return this.convertToUsers(response.result);
            default:
              return [];
          }
        })
      );
  }
}
