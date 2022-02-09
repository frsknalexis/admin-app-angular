import { Medico } from "../models/medico.model";

export interface MedicoResponse {

  ok: boolean;
  medicos: Medico[];
}
