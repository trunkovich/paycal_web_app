import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pcl-forgot-password-success',
  templateUrl: './forgot-password-success.component.html',
  styleUrls: ['./forgot-password-success.component.scss']
})
export class ForgotPasswordSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBackBtnClick($event: MouseEvent) {
    this.router.navigate(['/', 'login']);
  }
}
