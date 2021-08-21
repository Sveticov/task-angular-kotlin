import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonthData} from "./months-general/model/MonthData";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private url_month = 'http://localhost:8080/api/month'
  constructor(private http:HttpClient) {
  }


  findAllMonthsByWorld(world:String):Observable<any>{
    return this.http.get(`${this.url_month}/list/${world}`)
  }

  findMonthByID(id: number):Observable<any> {
    return this.http.get(`${this.url_month}/${id}`)
  }
  deleteMonthByID(id:number):Observable<any>{
    return this.http.get(`${this.url_month}/delete/${id}`)
  }

  createNewMonth(value: any):Observable<any> {
    return  this.http.post<MonthData>(`${this.url_month}`,value)
  }

  editMonth(value:any):Observable<any>{
    return  this.http.put<MonthData>(`${this.url_month}`,value)
  }
}
