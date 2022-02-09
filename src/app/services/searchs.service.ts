import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import {Hospital} from "../models/hospital.model";
import {Medico} from "../models/medico.model";

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

  private convertToHospital(result: any[]): Hospital[] {
    return result.map((hospital) => new Hospital(hospital._id, hospital.name,
      hospital.image, hospital.user));
  }

  private convertToMedicos(result: any[]): Medico[] {
    return result.map((medico) => new Medico(medico._id, medico.name,
      medico.image, medico.user, medico.hospital));
  }

  search(type: string, searchText: string) {
    return this.httpClient.get< { ok: boolean,result: any[] | User[] |
        Hospital[] | Medico[] }>(`${ this.baseURIApi }/search/${ type }/${ searchText }`,
      this.headers)
      .pipe(
        map((response: any) => {
          switch (type) {
            case 'users':
              return this.convertToUsers(response.result);
            case 'hospitales':
              return this.convertToHospital(response.result);
            case 'medicos':
              return this.convertToMedicos(response.result);
            default:
              return [];
          }
        })
      );
  }
}
