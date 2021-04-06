import { Injectable } from "@angular/core";
import { BankDataEntry } from "./bank-data-entry";
import { FelixDate } from "./felix-date";
import { NgxCsvParser } from 'ngx-csv-parser';
import { HttpClient } from "@angular/common/http";
import { YEARS } from "./constants";

@Injectable({
    providedIn: 'root',
  })
export class FinanceDataService {
  private bankdataEntries: BankDataEntry[] = [];
  private yearBalances: number[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private http: HttpClient) {
    this.reloadData();
  }

  init() {
    this.initYearBalances();
  }

  reloadData() {
    this.loadDataFromFile('all.txt');
  }

  getYearBalances(): number[] {
    return this.yearBalances;
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
          this.init();
    });
  }

  private initYearBalances() {
    this.yearBalances = [];
    YEARS.forEach(year => {
      this.yearBalances.push(this.getMonthValues(year).reduce((a,b) => a + b, 0));
    });
  }

  private convertStringToDate(stringDate: string): FelixDate {
    const day = parseInt(stringDate.substring(0, 2));
    const month = parseInt(stringDate.substring(3, 5));
    const year = parseInt(stringDate.substring(6, 10));
    return new FelixDate(day, month, year);
  }

  getMonthValues(selectedYear: string): number[] {
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