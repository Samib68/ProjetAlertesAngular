import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Observable} from "rxjs";

export const AdminGuard: CanActivateFn = ():

    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree=> {

    return inject(AuthService).authenticated() && inject(AuthService).isAdmin()
        ? true
        : inject(Router).createUrlTree(['/home']);
};