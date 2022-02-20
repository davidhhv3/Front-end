import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Status} from '../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  ulr:string="https://localhost:7071/api/status";


  constructor(private http:HttpClient) { }

  getStatus():Observable<Status[]>{
     return this.http.get<Status[]>(this.ulr);
  }
  getOneStatus(id:number):Observable<Status>{
    return this.http.get<Status>(this.ulr+'/'+id);
 }
}
