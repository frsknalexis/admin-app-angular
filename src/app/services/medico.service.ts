import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { MedicoResponse } from "../interfaces/medico-response.interface";
import {Medico} from "../models/medico.model";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  loadMedicos() {
    return this.httpClient.get<MedicoResponse>(`${ this.baseURIApi }/medicos`,
      this.headers)
      .pipe(map((response: MedicoResponse) => response.medicos));
  }

  getMedico(medicoId: string) {
    return this.httpClient.get<{ ok: boolean, medico: Medico }>(`${ this.baseURIApi}/medicos/${ medicoId }`,
      this.headers)
      .pipe(map((response: { ok: boolean, medico: Medico }) => response.medico));
  }

  createMedico(data: { name: string, hospital: string }) {
    return this.httpClient.post<{ ok: boolean,
      medico: { name: string, user: string, hospital: string, _id: string }}>(`${ this.baseURIApi }/medicos`,
      data, this.headers);
  }

  updateMedico(medicoId: string, data: { name: string, hospital: string }) {
    return this.httpClient.put<{ ok: boolean,
      medico: { _id: string, name: string, user: string, hospital: string } }>(`${ this.baseURIApi }/medicos/${ medicoId }`,
      data, this.headers);
  }

  deleteMedico(medicoId: string) {
    return this.httpClient.delete<{ ok: boolean, message: string }>(`${ this.baseURIApi }/medicos/${ medicoId }`,
      this.headers);
  }
}
