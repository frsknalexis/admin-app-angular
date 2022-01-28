import { Component, OnInit } from '@angular/core';
import { ModalImageService } from "../../services/modal-image.service";
import {UploadImage} from "../../interfaces/upload-image.interface";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html'
})
export class ModalImageComponent implements OnInit {

  // @ts-ignore
  public uploadFile: File;

  public imageTemp: any = '';

  constructor(public modalImageService: ModalImageService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {  }

  closeModal() {
    this.imageTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(event: Event) {
    // @ts-ignore
    const file: File = event.target.files[0];
    this.uploadFile = file;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => this.imageTemp = reader.result;
    } else {
      this.imageTemp = '';
    }
  }

  uploadImage() {
    const type = this.modalImageService.type;
    const id = this.modalImageService.id;

    this.fileUploadService.updatePhoto2(this.uploadFile, type, id)
      .subscribe((response: UploadImage) => {
        console.log(response);
        Swal.fire('Success', 'Image has been updated', 'success');
        this.modalImageService.newImage.emit(response.imageName);
        this.closeModal();
      }, (e: HttpErrorResponse) => {
        Swal.fire('Oops...', e.error.message, 'error');
      });
  }
}
