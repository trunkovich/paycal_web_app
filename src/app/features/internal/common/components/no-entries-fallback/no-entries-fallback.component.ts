import {Component, Input} from '@angular/core';

@Component({
  selector: 'pcl-no-entries-fallback',
  template: `
<div class="icon">
  <mat-icon [svgIcon]="icon"></mat-icon>
</div>
<div class="no-entries-text">
  {{text}}
</div>
`,
  styleUrls: ['./no-entries-fallback.component.scss']
})
export class NoEntriesFallbackComponent {
  @Input() icon: string;
  @Input() text: string;
}
