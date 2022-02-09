import { HospitalUser } from "../interfaces/hospital-user.interface";

export class Hospital {

  constructor(
    public _id: string,
    public name: string,
    public image: string,
    public user?: HospitalUser) {  }
}
