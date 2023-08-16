import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';

const URL = 'http://localhost:5500/';
const PATH = 'api/employee/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  postEmployeeForm(Employee_Form : Employee) {
    return this.http.post<any>(URL+PATH+'register', Employee_Form)
  }

  updateEmployee(Employee_Form : Employee) {
    return this.http.post<any>(URL+PATH+'update/id', Employee_Form)
  }

  updatePassword(Password : any ) {
    return this.http.post<any>(URL+PATH+'update/password', Password)
  }

  updatePicture(pic : any ) {
    return this.http.post<any>(URL+PATH+'update/picture', pic)
  }

  getEmployeeId(Employee_Id : any) {
    return this.http.post<any>(URL+PATH+'get/id', Employee_Id)
  }

  deleteEmployee(Employee_Id : any) {
    return this.http.post<any>(URL+PATH+'delete/id', Employee_Id)
  }
}