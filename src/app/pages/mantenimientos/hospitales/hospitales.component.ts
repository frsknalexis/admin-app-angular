import {Component, OnDestroy, OnInit} from '@angular/core';
import { HospitalService } from "../../../services/hospital.service";
import { Hospital } from "../../../models/hospital.model";
import Swal from "sweetalert2";
import {ModalImageService} from "../../../services/modal-image.service";
import { delay } from "rxjs/operators";
import { Subscription } from "rxjs";
import {SearchsService} from "../../../services/searchs.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];

  public hospitalesTemp: Hospital[] = [];

  public loading: boolean = true;

  // @ts-ignore
  private newImageSubscription: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImageService: ModalImageService,
              private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.loadHospitales();
    this.newImageSubscription = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((value) => this.loadHospitales());
  }

  loadHospitales() {
    this.loading = true;
    this.hospitalService.loadHospitales()
      .subscribe((response: Hospital[]) => {
        this.loading = false;
        this.hospitales = response;
        this.hospitalesTemp = response;
        console.log(response);
      });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, { name: hospital.name })
      .subscribe((response) => {
        console.log(response);
        Swal.fire(
          `Hospital has been updated`,
          response.hospital.name,
          'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Delete Hospital?',
      text: `Are you sure delete to ${ hospital.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe((response) => {
            console.log(response);
            Swal.fire('Deleted!',
              'Hospital has been deleted.',
              'success');
            this.loadHospitales();
          });
      }
    });
  }

  async openSweetAlertCreateHospital() {
    const { value } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    if (value && value.trim().length > 0) {
      this.hospitalService.createHospital({ name: value })
        .subscribe((response) => {
          console.log(response);
          // @ts-ignore
          this.hospitales.push(response.hospital);
        });
    }
  }

  showModal(hospital: Hospital) {
    this.modalImageService.showModal('hospitales', hospital._id, hospital.image);
  }

  searchHospitales(searchText: string) {
    if (searchText.length === 0) {
      this.hospitales = this.hospitalesTemp;
    } else {
      this.searchsService.search('hospitales', searchText)
        .subscribe((response) => {
          console.log(response);
          // @ts-ignore
          this.hospitales = response;
        });
    }
  }

  ngOnDestroy() {
    this.newImageSubscription.unsubscribe();
  }
}
