import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { Category } from 'src/app/shared/categories';
import { DataEntrySort } from '../shared/data-entry-sort';
import { DataEntrySortDirection } from '../shared/data-entry-sort-direction';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent {

    @Input() entries: BankDataEntry[];
    @Output() entryChanged: EventEmitter<BankDataEntry> = new EventEmitter<BankDataEntry>();

    columnsToDisplay = [
        'date',
        'recipient',
        'amount',
        'event',
        'message',
        'category',
    ];
    size = 10;
    start = 0;
    end: number = this.start + this.size;
    sort: DataEntrySort;
    sortDirection: DataEntrySortDirection;
    categoryType = Category;

    updatePageData(event: PageEvent): void {
        this.size = event.pageSize;
        this.start = event.pageIndex * event.pageSize;
        this.end = this.start + event.pageSize;
    }

    onSortChange(event: Sort): void {
        this.sort = DataEntrySort[event.active as keyof typeof DataEntrySort];
        this.sortDirection =
            DataEntrySortDirection[
                event.direction as keyof typeof DataEntrySortDirection
            ];
    }

    onCategorySelectionChange(
        entry: BankDataEntry,
        event: MatSelectChange
    ): void {
        const changedEntry: BankDataEntry = {
            ...entry,
            category: event.value
        };
        this.entryChanged.emit(changedEntry);
    }        
}