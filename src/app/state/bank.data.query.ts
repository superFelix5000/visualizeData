import { QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { BankDataState, BankDataStore } from './bank.data.store';
import { Injectable } from '@angular/core';
import { BankDataEntry } from '../shared/bank-data-entry';
import { map } from 'rxjs/operators';
import { YEARS } from '../shared/constants';

@Injectable({
    providedIn: 'root',
})
export class BankDataQuery extends QueryEntity<BankDataState> {
    constructor(protected store: BankDataStore) {
        super(store);
    }

    selectCurrentYear$: Observable<number> = this.select(
        (state) => state.selectedYear
    );

    /**
     * @returns the month values for the currently selected year
     */
    selectCurrentMonthValues$: Observable<number[]> = combineLatest([
        this.selectAll(),
        this.selectCurrentYear$,
    ]).pipe(map(([entries, year]) => this.getMonthValues(entries, year)));

    /**
     * @returns the total balance of each year
     */
    selectYearBalances$: Observable<number[]> = this.selectAll().pipe(
        map((entries) =>
            YEARS.map((year) =>
                this.getMonthValues(entries, year).reduce((a, b) => a + b)
            )
        )
    );

    private getMonthValues(entries: BankDataEntry[], year: number): number[] {
        const returnArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
            returnArray[i] = entries
                .filter((entry) => entry.paymentDate.year === year)
                .filter((entry) => entry.paymentDate.month === i + 1)
                .map((entry) => entry.amount)
                .reduce((a, b) => a + b, 0);
        }
        return returnArray;
    }
}
