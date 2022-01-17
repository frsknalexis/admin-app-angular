import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }
}
