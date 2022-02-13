import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  private baseURIApi: string = environment.baseURIApi;

  transform(image: string = 'no-image', type: string): string {
    if (image) {
      if (image.includes('https')) {
        return image;
      }
      return `${ this.baseURIApi }/upload/${ type }/${ image }`;
    } else {
      return `${ this.baseURIApi }/upload/${ type }/no-image`;
    }
  }
}
