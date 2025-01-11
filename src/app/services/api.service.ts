import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadFormData } from '../models/upload-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:44363/api/GreenAPI/UploadFormDataAsync';

  constructor(private http: HttpClient) {}
  submitForm(formData: UploadFormData , userId :number = 1 ): Observable<any> {
    const data = new FormData();
    data.append('chatId', formData.chatId);
    data.append('caption', formData.caption);
    data.append('fileName', formData.fileName);
    data.append('Name', formData.Name);
    data.append('NameLab', formData.NameLab);
    if (formData.Cost !== null) {
      data.append('Cost', formData.Cost.toString());
    }

    if (formData.file) {
      data.append('file', formData.file);
    }
    const headers = new HttpHeaders().set('UserId', userId.toString());

    return this.http.post(this.apiUrl, data , { headers: headers });
  }
}