import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.css']
})
export class WeatherDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  getDate(date:string) {
    return new Date(date).toDateString()
  }
  getIcon(icon:string):string {
    return `https://www.metaweather.com/static/img/weather/${icon}.svg`
  } 
  onNoClick(): void {
    this.dialogRef.close();
  }

}