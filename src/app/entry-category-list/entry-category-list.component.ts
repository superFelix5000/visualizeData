import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Category } from 'src/app/shared/categories';
import { RecipientCategory } from '../shared/recipient-category';

@Component({
    selector: 'app-entry-category-list',
    templateUrl: './entry-category-list.component.html',
    styleUrls: ['./entry-category-list.component.scss'],
})
export class EntryCategoryListComponent {

    @Input() entries: RecipientCategory[];
    @Output() entryChanged: EventEmitter<RecipientCategory> = new EventEmitter<RecipientCategory>();

    columnsToDisplay = [
        'recipient',
        'category',
    ];
    size = 10;
    start = 0;
    end: number = this.start + this.size;
    categoryType = Category;

    updatePageData(event: PageEvent): void {
        this.size = event.pageSize;
        this.start = event.pageIndex * event.pageSize;
        this.end = this.start + event.pageSize;
    }

    onCategorySelectionChange(
        entry: RecipientCategory,
        event: MatSelectChange
    ): void {
        const changedEntry: RecipientCategory = {
            ...entry,
            category: event.value
        };
        this.entryChanged.emit(changedEntry);
    }        
}
