import { environment } from "../../environments/environment";

const baseURIApi = environment.baseURIApi;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public image?: string,
    public userId?: string,
    public role?: string
  ) {  }

  get imageUrl() {
    if (this.image) {
      if (this.image?.includes('https')) {
        return this.image;
      }
      return `${ baseURIApi }/upload/users/${ this.image }`;
    } else {
      return `${ baseURIApi }/upload/users/no-image`;
    }
  }
}
