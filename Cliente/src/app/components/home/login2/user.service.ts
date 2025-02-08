import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<{ username: string; email: string } | null>(null);
  currentUserProfile = this.userProfileSubject.asObservable();

  constructor() {}

  updateUserProfile(profile: { username: string; email: string } | null) {
    this.userProfileSubject.next(profile);
  }
} 