import { Component, OnInit } from "@angular/core";

@Component({
    selector: "user-info-page",
    templateUrl: '../components/userinfopage.component.html',
    styleUrls: ['../components/userinfopage.component.css']
})
export class UserInfoPageComponent implements OnInit {
    userData: any;

    constructor() {}

    ngOnInit() {
        const email = localStorage.getItem('userEmail');
        if (email) {
            this.userData = JSON.parse(localStorage.getItem(email)!);
        } else {
            this.userData = null;
        }
    }

    logout() {
        if (this.userData) {
            localStorage.removeItem(this.userData.email);
        }
        localStorage.removeItem('userEmail');
        window.location.href = ''; 
    }
}