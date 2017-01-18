import { Component } from '@angular/core';

@Component({
  selector: 'pcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor() { }

  openContactUsDialog() {
    console.log('contact us clicked');
  }

}
