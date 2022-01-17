import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserResponse } from "../../interfaces/user-response.interface";
import { User } from "../../models/user.model";
import { FileUploadService } from "../../services/file-upload.service";
import { UploadImage } from "../../interfaces/upload-image.interface";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  public profileForm: FormGroup;

  public user: User;

  // @ts-ignore
  public uploadFile: File;

  public imageTemp: any = '';

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email ] ]
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe((response: UserResponse) => {
        // @ts-ignore
        const { name, email } = response.user;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Success', 'User has been updated', 'success');
      }, (e: HttpErrorResponse) => {
        Swal.fire('Oops...', e.error.message, 'error');
      });
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
    // @ts-ignore
    this.fileUploadService.updatePhoto2(this.uploadFile, 'users', this.user.userId)
      .subscribe((response: UploadImage) => {
        console.log(response);
        this.user.image = response.imageName;
        Swal.fire('Success', 'Image has been updated', 'success');
      }, (e: HttpErrorResponse) => {
        Swal.fire('Oops...', e.error.message, 'error');
      });
  }
}
