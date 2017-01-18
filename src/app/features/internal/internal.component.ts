import { Component } from '@angular/core';

@Component({
  selector: 'pcl-internal',
  template: `
    <pcl-navigation></pcl-navigation>
    <router-outlet></router-outlet>
  `
})
export class InternalComponent {}
