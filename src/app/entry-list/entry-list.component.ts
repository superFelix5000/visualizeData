import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { Category } from 'src/app/shared/categories';
import { DataEntrySort } from '../shared/data-entry-sort';
import { DataEntrySortDirection } from '../shared/data-entry-sort-direction';
import { BankDataService } from '../state/bank.data.service';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent {
    @Input() entries: BankDataEntry[] = [];
    @Output() onEntryChanged = new EventEmitter<Partial<BankDataEntry>>();
    @Output() onUpload = new EventEmitter();

    entryChanged = false;

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
    searchFieldValue = '';

    constructor(private bankDataService: BankDataService) {}

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
        this.onEntryChanged.emit({ id: entry.id, category: event.value });
        // TODO: move flag to store and have global "sync" button
        this.entryChanged = true;
    }

    onUploadClicked(): void {
        this.onUpload.emit();
        this.entryChanged = false;
    }

    onInputChange(e: string): void {
        this.bankDataService.setSearchQuery(e);
    }

    onSearchClear(): void {
        this.searchFieldValue = '';
        this.bankDataService.setSearchQuery(this.searchFieldValue);
    }
}
