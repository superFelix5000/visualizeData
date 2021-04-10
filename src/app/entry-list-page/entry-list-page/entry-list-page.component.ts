import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { BankDataQuery } from 'src/app/state/bank.data.query';

@Component({
  selector: 'app-entry-list-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss']
})
export class EntryListPageComponent implements OnInit {

  columnsToDisplay = ['date', 'payer', 'amount'];
  size: number = 10 ;
  start: number = 0;
  end: number = this.start + this.size;
  entries$: Observable<BankDataEntry[]>;

  constructor(private bankDataQuery: BankDataQuery) { }

  ngOnInit(): void {
    this.entries$ = this.bankDataQuery.selectAll();
  }

  updatePageData(event: PageEvent) {
    this.size = event.pageSize;
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }

}
