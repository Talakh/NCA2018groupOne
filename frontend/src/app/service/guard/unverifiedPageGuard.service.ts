import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {User} from "../../model/user.model";

@Injectable()
export class UnverifiedPageGuardService implements CanActivate {

  user: User;

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    if (this.authService.checkSignIn()) {
      this.authService.currentUser().subscribe((user: User) => {
        this.user = user;
        if (!this.user.roles.includes('UNVERIFIED_CLIENT')) {
          this.router.navigate(['/verifyEmail']);
        }
      });
    }
    return true;
  }

}