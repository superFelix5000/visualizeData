import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { BankDataEntry } from "../shared/bank-data-entry";
import { Injectable } from '@angular/core';
import { YEARS } from "../shared/constants";

export interface BankDataState extends EntityState<BankDataEntry> {
    //yearBalances: number[];
    selectedYear: number
}
  
const initialState: BankDataState = {
    //yearBalances: []
    selectedYear: YEARS[YEARS.length - 1]
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