import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HospitalResponse } from "../interfaces/hospital-response.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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
    };
  }

  loadHospitales() {
    return this.httpClient.get<HospitalResponse>(`${ this.baseURIApi }/hospitales`,
      this.headers)
      .pipe(map((response: HospitalResponse) => response.hospitales));
  }

  createHospital(data: { name: string }) {
    return this.httpClient.post<{ ok: boolean,
      hospital: { name: string, user: string, _id: string } }>(`${ this.baseURIApi }/hospitales`,
      data, this.headers);
  }

  updateHospital(hospitalId: string, data: { name: string }) {
    return this.httpClient.put<{ ok: boolean,
      hospital: { _id: string, name: string, user: string } }>(`${ this.baseURIApi }/hospitales/${ hospitalId }`,
      data, this.headers);
  }

  deleteHospital(hospitalId: string) {
    return this.httpClient.delete<{ ok: boolean, message: string }>(`${ this.baseURIApi }/hospitales/${ hospitalId }`,
      this.headers);
  }
}
