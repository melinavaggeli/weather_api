import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { debounceTime, filter, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit,OnDestroy {


  autocompleteValue = new FormControl('')
  options: any[] = [];
  private subscription:any;

  constructor(private ws:WeatherService) { }

  ngOnInit(): void {

    this.subscription = this.autocompleteValue.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap(val => true ?  this.onAutocomplete(val) : of([])),
      map(val => val.data)
     ).subscribe()
  }




  onAutocomplete(val:any) {
    this.ws.autocomplete(val).subscribe(
      v =>{
      console.log(v)
      this.options = v
       
    },
    
    err => console.log(err))
    return this.options
  }




  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
