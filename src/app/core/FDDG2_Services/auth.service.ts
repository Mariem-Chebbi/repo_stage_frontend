import { Injectable } from '@angular/core';
import { User } from '../FDDG2_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private staticUsers = [
    { id: '66af86f9beaedb745235467c', username: 'manager1', password: 'password1', role: 'projectManager' },
    { id: '66af86f9beaedb745235467d', username: 'manager2', password: 'password2', role: 'projectManager' },
    { id: '66af86f9beaedb745235467e', username: 'executor1', password: 'password3', role: 'executor' },
    { id: '66af86f9beaedb745235467f', username: 'executor2', password: 'password4', role: 'executor' },
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.staticUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(localStorage);
      return true;
    }
    return false;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
