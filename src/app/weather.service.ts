import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  autocompletUrl:string;
  proxyUrl:string;
  locationUrl:string;
  

  constructor(private http: HttpClient) { 
    this.autocompletUrl = 'https://www.metaweather.com/api/location/search/';
    this.locationUrl = 'https://www.metaweather.com/api/location/';
    this.proxyUrl = 'https://weather-proxy-melina.herokuapp.com/'
   
  }

  autocomplete(q:string): Observable<any> {
  
    return this.http.post(this.proxyUrl, {url:this.autocompletUrl,params:{query:q}} )
  }

  getLocation(id:string | number) {
    return this.http.post(this.proxyUrl,{url:this.locationUrl+id+"/"})
  }
  
}
