import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { exit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = environment.service.url;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
  }

  getTasks() {
    return this.http.get(`${ this.url }tasks`, {  headers: this.headers  }).pipe( map( data => data ));
  }

  saveTask(task: any) {
    let body = JSON.stringify(task);
    return this.http.post(`${ this.url }tasks`, body , { headers: this.headers });
  }

  deleteTask( id : any ) {
    return this.http.delete(`${ this.url }tasks/${ id }`, { headers: this.headers }).pipe( map( res => res ));
  }

}
