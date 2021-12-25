import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { BankDataEntry, createBankDataEntry } from '../shared/bank-data-entry';
import { SimpleDate } from '../shared/simple-date';
import { BankDataStore } from './bank.data.store';

@Injectable({ providedIn: 'root' })
export class BankDataService {
    constructor(
        private bankDataStore: BankDataStore,
        private http: HttpClient,
        private ngxCsvParser: NgxCsvParser
    ) {}

    init(): void {
        this.reloadData();
    }

    setYear(year: number): void {
        this.bankDataStore.update((state) => ({ selectedYear: year }));
    }

    reloadData(): void {
        this.bankDataStore.remove();
        this.bankDataStore.reset();
        this.loadDataFromLocalFile('all.txt');
    }

    private loadDataFromLocalFile(file: string): void {
        this.http
            .get('assets/' + file, { responseType: 'text' })
            .subscribe((data) => {                
                this.bankDataStore.add(this.readBankDataEntriesFromData(data));
            });
    }

    readBankDataEntriesFromData(data: string): BankDataEntry[] {
        const bankDataEntries: BankDataEntry[] = [];
        const entries: any[][] = this.ngxCsvParser.csvStringToArray(
            data,
            '\t'
        );
        entries
            .filter((entry) => entry.length > 3)
            .forEach((entry) => {
                bankDataEntries.push(
                    createBankDataEntry(
                        this.convertStringToDate(entry[0]),
                        this.convertStringToDate(entry[1]),
                        this.convertStringToDate(entry[2]),
                        parseFloat(entry[3].replace(',', '.')),
                        (entry[4] as string).toLowerCase(),
                        entry[5],
                        entry[6],
                        entry[7],
                        entry[8],
                        entry[9],
                        entry[10],
                        entry[11],
                        entry[12]
                    )
                );
            });
        return bankDataEntries;
    }

    updateEntry(id: string, entry: Partial<BankDataEntry>): void {
        this.bankDataStore.update(id, entry);
    }

    private convertStringToDate(stringDate: string): SimpleDate {
        const day = parseInt(stringDate.substring(0, 2));
        const month = parseInt(stringDate.substring(3, 5));
        const year = parseInt(stringDate.substring(6, 10));
        return new SimpleDate(day, month, year);
    }

    
}
