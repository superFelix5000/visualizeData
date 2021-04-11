import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { BankDataService } from 'src/app/state/bank.data.service';
import { DataEntrySort, DataEntrySortDirection } from 'src/app/state/bank.data.store';

@Component({
  selector: 'app-entry-list-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss']
})
export class EntryListPageComponent implements OnInit {

  columnsToDisplay = ['date', 'recipient', 'amount'];
  size: number = 10 ;
  start: number = 0;
  end: number = this.start + this.size;
  entries$: Observable<BankDataEntry[]>;
  sort: DataEntrySort;
  sortDirection: DataEntrySortDirection;

  constructor(private bankDataQuery: BankDataQuery,
              private bankDataService: BankDataService) { }

  ngOnInit(): void {
    this.entries$ = this.bankDataQuery.selectAll();
    this.bankDataQuery.selectSort$.subscribe(sort => {
        this.sort = sort;
    });
    this.bankDataQuery.selectSortDirection$.subscribe(dir => {
        this.sortDirection = dir;
    });
  }

  updatePageData(event: PageEvent) {
    this.size = event.pageSize;
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }

  onSortChange(event: Sort) {
    let sort = event.active as keyof typeof DataEntrySort;
    let direction = event.direction as keyof typeof DataEntrySortDirection;
    this.bankDataService.setSort(DataEntrySort[sort]);
    this.bankDataService.setSortDirection(DataEntrySortDirection[direction]);
    console.log(event);
  }

}
