import { Pipe, PipeTransform } from "@angular/core";
import { BankDataEntry } from "../shared/bank-data-entry";
import { DataEntrySort, DataEntrySortDirection } from "../state/bank.data.store";

@Pipe({name: 'bankDataSort'})
export class BankDataSortPipe implements PipeTransform {

    transform(value: BankDataEntry[], sort: DataEntrySort, sortDirection: DataEntrySortDirection) {
        if (sortDirection != DataEntrySortDirection.NONE ) {
            switch(sort) {
                case DataEntrySort.recipient:
                    return value.sort((a,b) => this.sortByRecipient(a,b,sortDirection));
                case DataEntrySort.date:
                    return value.sort((a,b) => this.sortByDate(a,b,sortDirection));
            }
        }
        return value;
    }

    sortByDate(a: BankDataEntry, b: BankDataEntry, direction: DataEntrySortDirection): number {
        return 0;
    }

    sortByRecipient(a: BankDataEntry, b: BankDataEntry, direction: DataEntrySortDirection): number {
        var nameA = a.recipientOrPayer;
        var nameB = b.recipientOrPayer;
        if (nameA < nameB) {
          return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        if (nameA > nameB) {
          return direction === DataEntrySortDirection.asc ? 1 : -1;
        }
      
        return 0;
      }
}