import { Component } from '@angular/core';
import { User } from '../../../../core/FDDG2_Models/user';
import { AuthService } from '../../../../core/FDDG2_Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login() {
    if (this.authService.login(this.username, this.password)) {
      const user = this.authService.getCurrentUser();
      if (user) {
        if (user.role === 'projectManager') {
          this.router.navigate(['/pages/agile/workspace/getAllWS']);
        } else if (user.role === 'executor') {
          this.router.navigate([`/pages/agile/executer/affectedTasks`]);
        }
      }
    } else {
      this.errorMessage = 'Invalid username or password';
      console.log("Invalid username or password")
    }
  }
}
