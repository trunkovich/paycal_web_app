import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../auth.routes';

@Component({
  selector: 'pcl-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate([AUTH_ROUTES.LOGIN]);
  }

}
