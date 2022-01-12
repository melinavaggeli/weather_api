import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { WeatherService } from './weather.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Weather';
  private subscription:any;
  loading = false;
  autocompleteValue =  new FormControl('')
  locations: any[] = []
  location:any
  error = false
  mybreakpoint:any

  constructor(private ws:WeatherService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 950) ? 1 : 3;
    this.subscription = this.autocompleteValue.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      switchMap(val => {
        this.error = false
        return val?.trim() ?  this.onAutocomplete(val) : of([])}),
      map(val => val.data)
     ).subscribe(err => this.locations = [])
  }
 
  onAutocomplete(val:any) {
    this.loading = true
    this.error = false
    this.ws.autocomplete(val).subscribe(
      v =>{
      this.locations = v
      this.loading = false
      this.error = this.locations.length==0 
      
    },
    err =>{
      this.loading = false
    },
    )
    return this.locations
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  handleSize(event:any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
    }

}
