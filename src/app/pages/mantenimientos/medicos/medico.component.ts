import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HospitalService } from "../../../services/hospital.service";
import { Hospital } from "../../../models/hospital.model";
import { MedicoService } from "../../../services/medico.service";
import { Medico } from "../../../models/medico.model";
import Swal from "sweetalert2";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  // @ts-ignore
  public medicoForm: FormGroup;

  public hospitales: Hospital[] = [];

  // @ts-ignore
  public hospitalSelected: Hospital;

  // @ts-ignore
  public medicoSelected: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        if (params.id !== 'nuevo') {
          this.loadMedico(params.id);
        }
      });

    this.medicoForm = this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });

    this.loadHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe((value) => {
        // @ts-ignore
        this.hospitalSelected = this.hospitales.find((hospital: Hospital) => hospital._id === value);
      });
  }

  loadHospitales() {
    this.hospitalService.loadHospitales()
      .subscribe((response) => {
        this.hospitales = response;
      });
  }

  loadMedico(medicoId: string) {
    this.medicoService.getMedico(medicoId)
      .pipe(delay(100))
      .subscribe((response) => {
        const { name, hospital: { _id } } = response;
        this.medicoSelected = response;
        this.medicoForm.setValue({
          name, hospital: _id
        });
      });
  }

  saveMedico() {
    if (this.medicoSelected) {
      this.medicoService.updateMedico(this.medicoSelected._id, this.medicoForm.value)
        .subscribe((response) => {
          Swal.fire('Success', 'Medico has been updated', 'success');
          this.router.navigate([ '/dashboard/medicos' ]);
        });
    } else {
      console.log(this.medicoForm.value);
      this.medicoService.createMedico(this.medicoForm.value)
        .subscribe((response) => {
          Swal.fire('Success', 'Medico has been created', 'success');
          this.router.navigate([ '/dashboard/medicos' ]);
        });
    }
  }
}
