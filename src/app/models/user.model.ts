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
}
