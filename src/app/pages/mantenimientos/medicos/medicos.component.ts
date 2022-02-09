import {Component, OnDestroy, OnInit} from '@angular/core';
import {Medico} from "../../../models/medico.model";
import {MedicoService} from "../../../services/medico.service";
import {ModalImageService} from "../../../services/modal-image.service";
import {SearchsService} from "../../../services/searchs.service";
import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public loading: boolean = true;

  public medicos: Medico[] = [];

  public medicosTemp: Medico[] = [];

  // @ts-ignore
  private newImageSubscription: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImageService: ModalImageService,
              private searchsService: SearchsService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadMedicos();
    this.newImageSubscription = this.modalImageService.newImage
      .pipe(delay(150))
      .subscribe((value) => this.loadMedicos());
  }

  loadMedicos() {
    this.loading = true;
    this.medicoService.loadMedicos()
      .subscribe((response: Medico[]) => {
        this.loading = false;
        this.medicos = response;
        this.medicosTemp = response;
        console.log(response);
      })
  }

  showModal(medico: Medico) {
    console.log(medico);
    this.modalImageService.showModal(`medicos`, medico._id, medico.image);
  }

  searchMedicos(searchText: string) {
    if (searchText.length === 0) {
      this.medicos = this.medicosTemp;
    } else {
      this.searchsService.search('medicos', searchText)
        .subscribe((response) => {
          console.log(response);
          // @ts-ignore
          this.medicos = response;
        });
    }
  }

  ngOnDestroy() {
    this.newImageSubscription.unsubscribe();
  }

  createMedico() {
    this.router.navigate(['/dashboard/medico/nuevo']);
  }

  deleteMedico(medico: Medico) {
    console.log(medico);
    Swal.fire({
      title: 'Delete Medico?',
      text: `Are you sure delete to ${ medico.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico._id)
          .subscribe((response) => {
            console.log(response);
            Swal.fire('Deleted!',
              'Medico has been deleted.',
              'success');
            this.loadMedicos();
          });
      }
    });
  }
}
