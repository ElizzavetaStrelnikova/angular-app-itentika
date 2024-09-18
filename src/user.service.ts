import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface User {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    date: string;
    gender: string;
    city: string;
    extrainfo: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: { [email: string]: User } = {};

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.loadUsers();
    }

    private loadUsers() {
        if (isPlatformBrowser(this.platformId)) {
            const storedUsers = localStorage.getItem('users');
            console.log('Stored users:', storedUsers); 
            if (storedUsers) {
                try {
                    this.users = JSON.parse(storedUsers);
                    console.log('Loaded users:', this.users); 
                } catch (error) {
                    console.error('Error parsing users from localStorage', error);
                }
            }
        }
    }

    register(user: User): Observable<{ success: boolean; error?: string }> {
        return new Observable((observer) => {
            setTimeout(() => {
                if (this.users[user.email]) {
                    observer.next({ success: false, error: 'Пользователь с таким email уже существует' });
                } else {
                    this.users[user.email] = user;
                    if (isPlatformBrowser(this.platformId)) {
                        try {
                            localStorage.setItem('users', JSON.stringify(this.users));
                        } catch (error) {
                            console.error('Error saving users to localStorage', error);
                        }
                    }
                    observer.next({ success: true });
                }
                observer.complete();
            }, 1000);
        });
    }
}