import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-registration-step2',
  templateUrl: './registration-step2.component.html',
  styleUrls: ['./registration-step2.component.scss']
})
export class RegistrationStep2Component implements OnInit {
  params$;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params$ = this.route.snapshot.params;
  }

}
