import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.loadInitialUser();
  }

  loadInitialUser() {
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((user: any) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  saveUserImage(image: File): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async register(name: string, email: string, password: string, image: File) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const imageBase64 = await this.saveUserImage(image);
    let newUser = { name, email, password, image: imageBase64 };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUser() {
    return this.currentUserSubject.value;
  }

  updateUser(updatedUser: any) {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }
}
