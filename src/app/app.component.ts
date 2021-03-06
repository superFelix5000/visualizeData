import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    this.http.get('data/one.txt', { responseType: 'text'})
    .subscribe(data => {
      console.log(data);
    });
  }

  title = 'mein erstes chart';

  config : zingchart.graphset = {
    title: {text: 'jee'},
    type: 'bar', 
    series: [{ values: [3.5,4,5,5,6,7,5,3,1,2,3] }],
    "scale-x": {
        // Set scale label
        label: { text: 'Months' },
        // Convert text on scale indices
        
        values: [ 'January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December']
    }
  };
}
