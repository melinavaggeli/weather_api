import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {

  @Input() location: any;
  @Input() loading: boolean = false;
  @Output() weatherEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  getWeatherOfLocation() {
    this.weatherEmitter.emit(this.location?.woeid)
  }

}
