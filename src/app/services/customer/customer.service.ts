import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../interfaces/customer';


const URL = 'http://localhost:5500/';
const PATH = 'api/customer/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  registerCustomerForm(Customer_Form : Customer) {
    return this.http.post<any>(URL+PATH+'registration', Customer_Form)
  }

  postCustomerForm(Customer_Form : Customer) {
    return this.http.post<any>(URL+PATH+'register', Customer_Form)
  }

  updateCustomer(Customer_Form : Customer) {
    return this.http.post<any>(URL+PATH+'update/id', Customer_Form)
  }

  updatePassword(Password : any ) {
    return this.http.post<any>(URL+PATH+'update/password', Password)
  }

  updatePicture(pic : any ) {
    return this.http.post<any>(URL+PATH+'update/picture', pic)
  }

  getCustomerId(Customer_Id : any) {
    return this.http.post<any>(URL+PATH+'get/id', Customer_Id)
  }

  deleteCustomer(Customer_Id : any) {
    return this.http.post<any>(URL+PATH+'delete/id', Customer_Id)
  }
}