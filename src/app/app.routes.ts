import { Routes } from '@angular/router';
import { SignInPageComponent } from './pages/signinpage.component';
import { SignUpPageComponent } from './pages/signup.component';
import { UserInfoPageComponent } from './pages/userinfo.component';

export const routes: Routes = [
    { path: "", component: SignInPageComponent},
    { path: "sign-up", component: SignUpPageComponent},
    { path: "user-info", component: UserInfoPageComponent },
    { path: "**", redirectTo: "/"}
];
