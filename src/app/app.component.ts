import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { HttpClient} from "@angular/common/http";
import { BankDataEntry } from './bank-data-entry';
import { FelixDate } from "./felix-date";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  series: zingchart.series = null;
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
            parseFloat(entry[3].replace(',', '.')),
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
      this.updateCharts();
    });
  }
  // 17.08.2017
  private convertStringToDate(stringDate: string): FelixDate {
    const day = parseInt(stringDate.substring(0, 2));
    const month = parseInt(stringDate.substring(3, 5));
    const year = parseInt(stringDate.substring(6, 10));
    return new FelixDate(year, month, day);
  }

  title = 'mein erstes chart';

  config : zingchart.graphset = {
    title: {text: 'jee'},
    type: 'bar', 
    "scale-x": {
        // Set scale label
        label: { text: 'Months' },
        // Convert text on scale indices
        
        values: [ 'January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  private updateCharts() {
    this.series = [{values: this.getMonthValues()}];
  }

  private getMonthValues(): number[] {
    let returnArray: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < 12; i++) {
      returnArray[i] = (this.bankdataEntries
        .filter(entry => entry.paymentDate.month === i + 1)
        .map(entry => entry.amount)
        .reduce((a,b) => a + b, 0));  
    }
    return returnArray;
  }
}
