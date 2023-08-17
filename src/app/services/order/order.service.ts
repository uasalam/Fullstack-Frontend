import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/interfaces/order';


const URL = 'http://localhost:5500/';
const PATH = 'api/order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(order : Order) {
    return this.http.post(URL+PATH+'create', order)
  }

  getOrders(order : any) {
    return this.http.post(URL+PATH+'get', order)
  }

  getAllOrders(order : any) {
    return this.http.post(URL+PATH+'get/all', order)
  }


  getById(id : any) {
    return this.http.post<any>(URL+PATH+'get/id', id)
  }

  updateStatus(status : any) {
    return this.http.post<any>(URL+PATH+'update/status', status)
  }

  updateRejectStatus(status : any) {
    return this.http.post<any>(URL+PATH+'update/reject', status)
  }

  updateOrder(order : Order):any{
    return this.http.post(URL+PATH+'update',order);
  }

}