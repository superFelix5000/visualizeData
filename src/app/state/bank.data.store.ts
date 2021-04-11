import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { BankDataEntry } from "../shared/bank-data-entry";
import { Injectable } from '@angular/core';
import { YEARS } from "../shared/constants";

// TOOD: move to shared models etc. folder
export enum DataEntrySort {
    date = 'date',
    recipient = 'recipient',
    amount = 'amount'
}

export enum DataEntrySortDirection {
    NONE = '',
    asc = 'asc',
    desc = 'desc'
}

export interface BankDataState extends EntityState<BankDataEntry> {
    selectedYear: number,
    dataEntrySort: DataEntrySort,
    dataEntrySortDirection: DataEntrySortDirection
}
  
const initialState: BankDataState = {
    selectedYear: YEARS[YEARS.length - 1],
    dataEntrySort: DataEntrySort.date,
    dataEntrySortDirection: DataEntrySortDirection.NONE
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'bankData' })
export class BankDataStore extends EntityStore<BankDataState> {
    constructor() {
        super(initialState);
    }
}