import { Component, OnInit } from '@angular/core';
import { Logger, LoggingService } from 'ionic-logging-service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../providers/auth.service';
import { LoginParams } from '../../providers/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: LoginParams = {mainNumber: '', username: '', password: ''};
  loading = false;
  submitted = false;
  returnUrl: string;
  returnUrlFallback = '/app/tabs/recents';
  error = '';

  private readonly logger: Logger;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loggingService: LoggingService,
  ) {
    this.logger = this.loggingService.getLogger('GoCon.LoginPage');

    if (this.authService.currentTokenValue) {
      this.router.navigate([this.returnUrlFallback]);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrlFallback;

    this.logger.debug('ngOnInit', `this.returnUrl: ${this.returnUrl}`);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    this.logger.debug('onLogin', 'submitted');

    if (form.valid) {
      this.logger.info('onLogin', 'form: valid')
      this.loading = true;

      this.authService.login(this.login)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;

            this.logger.error('onLogin: login fail', error);
          },
        );
    }
  }
}
