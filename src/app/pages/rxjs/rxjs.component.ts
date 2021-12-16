import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscription: Subscription = new Subscription();

  constructor() {

    // this.getObservable()
    //   .pipe(retry(2))
    //   .subscribe((value) => console.log('Subs: ', value),
    //     (e) => console.warn('Error: ', e),
    //     () => console.info('Obs terminado'));

    this.subscription = this.getInterval()
      .subscribe((value) => console.log(value));
  }

  ngOnInit(): void {  }

  getInterval() {
    return interval(500)
      .pipe(take(10),
        map((value) => value + 1),
        filter((value) => (value % 2 === 0)));
  }

  getObservable() {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
