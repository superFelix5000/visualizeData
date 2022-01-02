import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { BankDataEntry } from '../shared/bank-data-entry';
import { Injectable } from '@angular/core';
import { YEARS } from '../shared/constants';
import { RecipientCategory } from '../shared/recipient-category';

export interface BankDataState extends EntityState<BankDataEntry, string> {
    selectedYear: number;
    selectedMonth: number;
    recipientCategories: RecipientCategory[]
}

const initialState: BankDataState = {
    selectedYear: YEARS[YEARS.length - 1],
    recipientCategories: [],
    selectedMonth: null
};

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'bankData' })
export class BankDataStore extends EntityStore<BankDataState> {
    constructor() {
        super(initialState);
    }
}
