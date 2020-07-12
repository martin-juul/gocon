import { Component, OnInit } from '@angular/core';
import { LoginParams, UserDataService } from '../../providers/user-data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: LoginParams = {mainNumber: '', username: '', password: ''};
  submitted = false;

  constructor(private userDataService: UserDataService,
              private router: Router) {
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userDataService.login(this.login);
      this.redirect();
    }
  }

  async ngOnInit() {
    if (await this.userDataService.isLoggedIn()) {
      this.redirect();
    }
  }

  redirect() {
    this.router.navigateByUrl('/app/tabs/recents');
  }
}
