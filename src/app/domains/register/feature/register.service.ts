import { environment } from '@/env';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  #http = inject(HttpClient);

  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    login: string;
  }) {
    return this.#http.post(`${environment.apiUrl}/register`, data);
  }
}
