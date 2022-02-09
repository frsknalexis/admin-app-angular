import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from "../../../services/user.service";
import {LoadUsers} from "../../../interfaces/load-users.interface";
import {User} from "../../../models/user.model";
import {SearchsService} from "../../../services/searchs.service";
import Swal from "sweetalert2";
import { ModalImageService}  from "../../../services/modal-image.service";
import {delay} from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;

  public users: User[] = [];

  public usersTemp: User[] = [];

  public from: number = 0;

  public loading: boolean = true;

  // @ts-ignore
  public newImageSubscription: Subscription;

  constructor(private userService: UserService,
              private searchsService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.newImageSubscription = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((value) => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from, 5)
      .subscribe((response: LoadUsers) => {
        const { total, users } = response;
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }

  searchUsers(searchText: string) {
    if (searchText.length === 0) {
      this.users = this.usersTemp;
    } else {
      this.searchsService.search('users', searchText)
        .subscribe((response) => {
          console.log(response);
          // @ts-ignore
          this.users = response;
        });
    }
  }

  deleteUser(user: User) {
    if (user.userId === this.userService.userId) {
      Swal.fire('Error al eliminar usuario',
        'No puede borrarse a si mismo',
        'error');
    } else {
      Swal.fire({
        title: 'Delete User?',
        text: `Are you sure delete to ${ user.name }`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user)
            .subscribe((response) => {
              console.log(response);
              this.loadUsers();
              Swal.fire('Deleted!',
                'User has been deleted.',
                'success');
            });
        }
      });
    }
  }

  changeRole(user: User) {
    this.userService.updateUser(user)
      .subscribe((response) => {
        console.log(response);
      });
  }

  showModal(user: User) {
    // @ts-ignore
    this.modalImageService.showModal('users', user.userId, user.image);
  }

  ngOnDestroy() {
    this.newImageSubscription.unsubscribe();
  }
}
