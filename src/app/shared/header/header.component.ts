import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: User;

  constructor(private userService: UserService,
              private router: Router) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search(searchText: string) {
    console.log(searchText);
    if (searchText.length === 0) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate([ '/dashboard/search', searchText ]);
    }
  }
}
