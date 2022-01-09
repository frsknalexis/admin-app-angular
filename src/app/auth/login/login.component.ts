import {Component, NgZone, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import { UserService } from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  public auth2: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  onLogin() {
    this.userService.login(this.loginForm.value)
      .subscribe((response) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        console.log(response);
        this.router.navigate(['/']);
      }, (e: HttpErrorResponse) => {
        Swal.fire('Oops...', e.error.message, 'error');
      });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      this.userService.googleSignIn(id_token)
        .subscribe((response) => {
          console.log(response);
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        }, (e: HttpErrorResponse) => {
          Swal.fire('Oops...', e.error.message, 'error');
        });
      }, (error: any) => {
      alert(JSON.stringify(error, undefined, 2));
    });
  }
}
