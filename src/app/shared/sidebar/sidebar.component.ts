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

  menuItems: any[] = [];

  public user: User;

  constructor(private sidebarService: SidebarService, private userService: UserService) {
    this.menuItems = sidebarService.menu;
    this.user = this.userService.user;
  }

  ngOnInit(): void {  }
}
