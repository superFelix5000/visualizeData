import { QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { BankDataState, BankDataStore } from './bank.data.store';
import { Injectable } from '@angular/core';
import { BankDataEntry } from '../shared/bank-data-entry';
import { map } from 'rxjs/operators';
import { YEARS } from '../shared/constants';
import { CategoryPercentage } from '../shared/category-percentage';
import { Category } from '../shared/categories';
import { RecipientCategory } from '../shared/recipient-category';

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

    selectCurrentMonth$: Observable<number> = this.select(
        (state) => state.selectedMonth
    );

    selectRecipientCategories$: Observable<RecipientCategory[]> = this.select(
        (state) => state.recipientCategories
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

    selectAllEntriesWithMatchedCategories$: Observable<BankDataEntry[]> = combineLatest([
        this.selectAll(),
        this.selectRecipientCategories$,
    ]).pipe(map(([entries, recipentCategories]) => {
        let rcMap: Map<string, Category> = new Map<string, Category>();
        recipentCategories.forEach(rc => rcMap.set(rc.recipient, rc.category));

        return entries.map(entry => {
            let category = entry.category != Category.OTHER ? entry.category :
                rcMap.has(entry.recipientOrPayer) ? rcMap.get(entry.recipientOrPayer) : Category.OTHER;
            return {
                ...entry,
                category
            };
        });
    }));

    selectAllEntriesPerSelectedYear$: Observable<BankDataEntry[]> = combineLatest([
        this.selectAllEntriesWithMatchedCategories$,
        this.selectCurrentYear$,
    ]).pipe(
        map(([entries, year]) => entries.filter(entry => entry.paymentDate.year === year))
    );

    /**
     * @returns the total amount for the selected year that I payed
     */
    selectTotalPaymentAmountForSelectedYear$: Observable<number> = 
        this.selectAllEntriesPerSelectedYear$.pipe(
            map(entries => entries.filter(entry => entry.amount < 0)),
            map(entries => entries.reduce((a,b) => a + b.amount, 0))
        );

    // TODO: refactor this - now this is getting called multiple times because of calculation logic
    /**
     * @returns all the categories for the selected year and their percentage of the total amount to pay
     */
     selectAllCategoriesPerSelectedYearAndMonth$: Observable<CategoryPercentage[]> = combineLatest([
        this.selectTotalPaymentAmountForSelectedYear$,
        this.selectAllEntriesPerSelectedYear$,
        this.selectCurrentMonth$
     ]).pipe(
            map(([totalYearAmount, yearEntries, month]) => this.getCategoryValues(yearEntries, totalYearAmount, month)
        ));

    private getCategoryValues(entries: BankDataEntry[], totalYearAmount: number, currentMonth: number): CategoryPercentage[] {        
        let categoryPercentages:CategoryPercentage[] = [];
        for (const cat in Category) {
            const category = Category[cat];
            const totalCategoryAmount = entries
                .filter(entry => currentMonth != null ? entry.paymentDate.month === currentMonth : true)
                .filter(entry => entry.amount < 0)
                .filter(entry => entry.category === category)
                .reduce((a, b) => a + Math.abs(b.amount), 0);
            if (totalCategoryAmount > 0) {
                categoryPercentages.push({
                    category, 
                    percentage: totalCategoryAmount / Math.abs(totalYearAmount),
                    totalValue: totalCategoryAmount
                });
            }            
        }
        return categoryPercentages;
    }
}
