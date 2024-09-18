import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

    constructor() {
        this.loadUsers();
    }

    private loadUsers() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        }
    }

    register(user: User): Observable<{ success: boolean; error?: string }> {
        return new Observable((observer) => {
            setTimeout(() => {
                if (this.users[user.email]) {
                    observer.next({ success: false, error: 'Пользователь с таким email уже существует' });
                } else {
                    this.users[user.email] = user;
                    localStorage.setItem('users', JSON.stringify(this.users));
                    observer.next({ success: true });
                }
                observer.complete();
            }, 1000); 
        });
    }
}