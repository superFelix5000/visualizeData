import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { HttpClient} from "@angular/common/http";
import { BankDataEntry } from './bank-data-entry';
import { FelixDate } from "./felix-date";
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  years:string[] = [
    '2017',
    '2018',
    '2019',
    '2020',
    '2021'
  ];  
  selectedYear: string = this.years[0];
  yearBalances = new Map<string, number>();
  series: zingchart.series = null;
  bankdataEntries: BankDataEntry[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    this.reloadData();
    // TODO: don't use setTimeOut
    setTimeout(() => this.initMapBalances(), 1000);
  }

  initMapBalances() {
    this.years.forEach(year => {
      let monthValues = this.getMonthValues(year);
      let sum = monthValues.reduce((a,b) => a + b, 0);
      this.yearBalances.set(year, this.getMonthValues(year).reduce((a,b) => a + b, 0))
    });
  }

  reloadData() {
    this.loadDataFromFile('all.txt');
  }

  private loadDataFromFile(file: string) {
    this.bankdataEntries = [];
    this.http.get('assets/' + file, { responseType: 'text'})
      .subscribe(data => {
        const entries: any[][] = this.ngxCsvParser.csvStringToArray(data, '\t');
        entries
          .filter(entry => entry.length > 3)
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
  
  onYearSelectionChange(ev: MatSelectChange) {
    console.log(ev.value);
    this.selectedYear = ev.value;
    this.updateCharts();
  }

  private convertStringToDate(stringDate: string): FelixDate {
    const day = parseInt(stringDate.substring(0, 2));
    const month = parseInt(stringDate.substring(3, 5));
    const year = parseInt(stringDate.substring(6, 10));
    return new FelixDate(day, month, year);
  }

  config : zingchart.graphset = {
    title: {text: 'jee'},
    type: 'bar', 
    "scale-x": {
        label: { text: 'Months' },       
        values: [ 'January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  private updateCharts() {
    this.series = [{values: this.getMonthValues(this.selectedYear)}];
  }

  private getMonthValues(selectedYear: string): number[] {
    let returnArray: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < 12; i++) {
      returnArray[i] = (this.bankdataEntries
        .filter(entry => entry.paymentDate.year === parseInt(selectedYear))
        .filter(entry => entry.paymentDate.month === i + 1)
        .map(entry => entry.amount)
        .reduce((a,b) => a + b, 0));  
    }
    return returnArray;
  }
}
