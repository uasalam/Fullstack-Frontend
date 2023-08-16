import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://pharmacy-backend-1u90.onrender.com/';
const PATH = 'api/upload/';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  postFiles(urls: File): any {
    return this.http.post(URL+PATH+'create',urls);
  }

  updatePicture(form: any): any {
    return this.http.post(URL+PATH+'update/picture',form);
  }

}