import { EventEmitter, Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private baseURIApi = environment.baseURIApi;

  private _ocultarModal: boolean = true;

  // @ts-ignore
  public type: string;
  // @ts-ignore
  public id: string;

  // @ts-ignore
  public image: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  showModal(type: string, id: string, image: string = 'no-image') {
    this._ocultarModal = false;
    this.type = type;
    this.id = id;

    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${ this.baseURIApi }/upload/${ type }/${ image }`;
    }
  }

  closeModal() {
    this._ocultarModal = true;
  }
}
