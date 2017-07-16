import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'pcl-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss']
})
export class GoogleFormComponent implements AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const doc = this.iframe.nativeElement.contentWindow.document;
    doc.open();
    doc.write(`
<style>body{margin: 0}</style>
<script type="text/javascript" src="//Paycal.formstack.com/forms/js.php/pmt"></script>
`);
    doc.close();
  }
}
