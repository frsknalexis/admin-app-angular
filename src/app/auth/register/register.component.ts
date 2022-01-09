import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    password2: [ '', Validators.required ],
    termino: [ false, Validators.required ]
  }, {
    validators: this.equalsPasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      console.log('Formulario no es valido');
    } else {
      this.userService.createUser(this.registerForm.value)
        .subscribe((response) => {
          console.log('user has been created');
          console.log(response);
          this.router.navigate(['/']);
        }, (e: HttpErrorResponse) => {
          Swal.fire('Oops...', e.error.message, 'error');
        });
    }
  }

  invalidField(field: string) {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('termino')?.value && this.formSubmitted;
  }

  invalidPasswords() {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    if ((password1 !== password2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  equalsPasswords(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const password2Control = formGroup.get(password2);

      if (passwordControl?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      } else {
        password2Control?.setErrors({
          isNotEquals: true
        });
      }
    };
  }
}
