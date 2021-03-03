import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mein erstes chart';

  config : zingchart.graphset = {
    type: 'line', 
      series: [{ values: [3,4,5,5,6,7,5,3] }] 
  };
}
