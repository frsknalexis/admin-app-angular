import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progress: number = 50;

  @Input() btnClass: string = 'btn-primary';

  @Output() changedValue: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  changeValue(value: number) {
    this.progress = this.progress + value;

    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
    }

    this.changedValue.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.changedValue.emit(this.progress);
  }
}
