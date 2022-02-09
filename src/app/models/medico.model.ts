import { MedicoUser } from "../interfaces/medico-user.interface";
import { MedicoHospital } from "../interfaces/medico-hospital.interface";

export class Medico {

  constructor(
    public _id: string,
    public name: string,
    public image: string,
    public user: MedicoUser,
    public hospital: MedicoHospital) {  }
}
