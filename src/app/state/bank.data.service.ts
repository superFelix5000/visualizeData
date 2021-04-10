import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { BankDataEntry } from '../shared/bank-data-entry';
import { SimpleDate } from '../shared/simple-date';
import {BankDataStore} from './bank.data.store';

@Injectable({providedIn: "root"})
export class BankDataService {
    constructor(private bankDataStore: BankDataStore,
                private http: HttpClient,
                private ngxCsvParser: NgxCsvParser){}

    init(){
        this.reloadData();
    }

    setYear(year: number) {
        this.bankDataStore.update(state => ({selectedYear: year}));
    }

    reloadData() {
        this.bankDataStore.remove();
        this.bankDataStore.reset();
        this.loadDataFromFile('all.txt');
    }

    private loadDataFromFile(file: string) {
        let bankDataEntries: BankDataEntry[] = [];
        this.http.get('assets/' + file, { responseType: 'text'})
          .subscribe(data => {
            const entries: any[][] = this.ngxCsvParser.csvStringToArray(data, '\t');
            entries
              .filter(entry => entry.length > 3)
              .forEach(entry => {
                bankDataEntries.push(new BankDataEntry(
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
            this.bankDataStore.add(bankDataEntries);
        });
      }
 
      private convertStringToDate(stringDate: string): SimpleDate {
        const day = parseInt(stringDate.substring(0, 2));
        const month = parseInt(stringDate.substring(3, 5));
        const year = parseInt(stringDate.substring(6, 10));
        return new SimpleDate(day, month, year);
      }
}