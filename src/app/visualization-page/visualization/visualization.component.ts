import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { BankDataEntry } from 'src/app/shared/bank-data-entry';
import { YEARS } from 'src/app/shared/constants';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { BankDataService } from 'src/app/state/bank.data.service';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent implements OnInit {
    years = YEARS;
    
    // TODO: not used atm
    selectedYear$: Observable<number>;

    yearBalances$: Observable<number[]> = of([]);
    valuesPerMonth$: Observable<zingchart.series[]>;
    filteredBankDataEntries$: Observable<BankDataEntry[]>;
    config: zingchart.graphset = {
        type: 'bar',
        plot: {
            'border-radius': '5px',
            valueBox: {
                text: '%stack-total',
                decimals: 0,
                fontSize: "20px"
            },
        },
        'scale-x': {
            values: [
                'January',
                'Feb',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        },
    };

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {}

    ngOnInit(): void {
        this.bankDataService.init();

        this.yearBalances$ = this.bankDataQuery.selectYearBalances$;
        this.selectedYear$ = this.bankDataQuery.selectCurrentYear$;
        this.valuesPerMonth$ = this.bankDataQuery.selectCurrentMonthValues$.pipe(
            map((values) => [{ values: values }])
        );
        this.filteredBankDataEntries$ = this.bankDataQuery.selectAllEntriesPerSelectedYearAndMonthAndCategory$;
    }

    onYearSelectionChange(year: number): void {
        this.bankDataService.setYear(year);
        this.bankDataService.setMonth(null);
        this.bankDataService.setCategory(null);
    }

    reloadData(): void {
        this.bankDataService.reloadData();
    }

    // TODO: type for ev
    nodeClicked(ev): void {
        this.bankDataService.setMonth(ev.nodeindex + 1);
        this.bankDataService.setCategory(null);
    }

    onEntryChanged(entry: Partial<BankDataEntry>) {
        this.bankDataService.updateEntry(entry.id, entry);
    }

    onUpload() {
        this.bankDataQuery.selectAll()
            .pipe(
                take(1),
                mergeMap(entries => this.bankDataService.uploadAll(entries)
            )).subscribe(obj => {
                console.log('data saved? ' + JSON.stringify(obj));
            });
    }
}
