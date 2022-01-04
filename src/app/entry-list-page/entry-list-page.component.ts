import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { Category } from '../shared/categories';
import { RecipientCategory } from '../shared/recipient-category';
import { BankDataService } from '../state/bank.data.service';

@Component({
    selector: 'app-entry-list-page',
    templateUrl: './entry-list-page.component.html',
    styleUrls: ['./entry-list-page.component.scss'],
})
export class EntryListPageComponent implements OnInit {
    entries$: Observable<BankDataEntry[]>;    

    constructor(private bankDataQuery: BankDataQuery) {}

    ngOnInit(): void {
        this.entries$ = this.bankDataQuery.selectAll();
    }    
}
