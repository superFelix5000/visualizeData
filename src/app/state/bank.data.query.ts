import { QueryEntity } from "@datorama/akita";
import { combineLatest, Observable } from "rxjs";
import { BankDataState, BankDataStore } from "./bank.data.store";
import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BankDataEntry } from "../shared/bank-data-entry";

@Injectable({
    providedIn: 'root'
  })
export class BankDataQuery extends QueryEntity<BankDataState> {

    constructor(protected store: BankDataStore) {
        super(store);
    }

    selectCurrentYear$ = this.select(state => state.selectedYear);

    // TODO: use non deprecated version
    selectCurrentMonthValues$ = combineLatest(
        this.selectAll(),
        this.selectCurrentYear$,
        this.getMonthValues
    );
    
    private getMonthValues(entries: BankDataEntry[], year: number): number[] {
        let returnArray: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i = 0; i < 12; i++) {
          returnArray[i] = (entries
            .filter(entry => entry.paymentDate.year === year)
            .filter(entry => entry.paymentDate.month === i + 1)
            .map(entry => entry.amount)
            .reduce((a,b) => a + b, 0));  
        }
        return returnArray;
    }
    
}