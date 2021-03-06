import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { HttpClient} from "@angular/common/http";
import { BankDataEntry } from './bank-data-entry';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  bankdataEntries: BankDataEntry[] = [];
  
  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    this.http.get('assets/one.txt', { responseType: 'text'})
    .subscribe(data => {
      const entries: any[][] = this.ngxCsvParser.csvStringToArray(data, '\t');
      entries
        .filter(entry => entry.length > 1)
        .forEach(entry => {
          this.bankdataEntries.push(new BankDataEntry(
            this.convertStringToDate(entry[0]),
            this.convertStringToDate(entry[1]),
            this.convertStringToDate(entry[2]),
            entry[3],
            entry[4],
            entry[5],
            entry[6],
            entry[7],
            entry[8],
            entry[9],
            entry[10],
            entry[11],
            entry[12]
          ));
        });
    });
  }

  private convertStringToDate(stringDate: string): Date {
    const dayString = stringDate.substring(0, 2);
    const monthString = stringDate.substring(4, 5);
    const yearString = stringDate.substring(6, 10);
    return new Date(yearString + '/' + monthString + '/' + dayString);
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

  private updateCharts() {
    this.config.series = [{values: []}];
  }
}
