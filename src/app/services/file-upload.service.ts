import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UploadImage } from "../interfaces/upload-image.interface";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseURIApi: string = environment.baseURIApi;

  constructor(private httpClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  updatePhoto2(file: File, type: string, id: string) {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient.put<UploadImage>(`${ this.baseURIApi }/upload/${ type }/${ id }`,
      formData, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
