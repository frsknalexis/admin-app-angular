import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string = '';

  subscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.subscription = this.getParametrosRouter()
      .subscribe((data: Data) => {
        this.titulo = data.titulo;
        document.title = `AdminPro - ${ this.titulo }`;
      });
  }

  getParametrosRouter() {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
