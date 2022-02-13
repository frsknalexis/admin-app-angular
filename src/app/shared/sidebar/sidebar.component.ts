import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";
import { UserService } from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: User;

  constructor(public sidebarService: SidebarService, private userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {  }
}
