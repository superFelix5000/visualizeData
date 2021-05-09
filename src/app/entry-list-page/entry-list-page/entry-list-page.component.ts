import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { Category } from 'src/app/shared/categories';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { BankDataService } from 'src/app/state/bank.data.service';

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

@Component({
  selector: 'app-entry-list-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss']
})
export class EntryListPageComponent implements OnInit {

  columnsToDisplay = ['date', 'recipient', 'amount', 'event', 'message', 'category'];
  size: number = 10 ;
  start: number = 0;
  end: number = this.start + this.size;
  entries$: Observable<BankDataEntry[]>;
  sort: DataEntrySort;
  sortDirection: DataEntrySortDirection;
  categoryType = Category;

  constructor(private bankDataQuery: BankDataQuery,
              private bankDataService: BankDataService) { }

  ngOnInit(): void {
    this.entries$ = this.bankDataQuery.selectAll();
  }

  updatePageData(event: PageEvent) {
    this.size = event.pageSize;
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }

  onSortChange(event: Sort) {
    this.sort = DataEntrySort[event.active as keyof typeof DataEntrySort];
    this.sortDirection = DataEntrySortDirection[event.direction as keyof typeof DataEntrySortDirection];
  }

}
