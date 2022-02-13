import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SearchsService} from "../../services/searchs.service";
import {User} from "../../models/user.model";
import {Medico} from "../../models/medico.model";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: User[] = [];

  public medicos: Medico[] = [];

  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const searchText = params.searchText;
        this.searchAll(searchText);
      });
  }

  searchAll(searchText: string) {
    this.searchsService.searchAll(searchText)
      .subscribe((response) => {
        console.log(response);
        this.users = response.users;
        this.medicos = response.medicos;
        this.hospitales = response.hospitales;
      });
  }
}
