import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
    selectedYear$: Observable<number>;
    yearBalances$: Observable<number[]> = of([]);
    series$: Observable<zingchart.series[]>;

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {}

    ngOnInit(): void {
        this.bankDataService.init();

        this.yearBalances$ = this.bankDataQuery.selectYearBalances$;
        this.selectedYear$ = this.bankDataQuery.selectCurrentYear$;
        this.series$ = this.bankDataQuery.selectCurrentMonthValues$.pipe(
            map((values) => [{ values: values }])
        );
    }

    onYearSelectionChange(year: number): void {
        this.bankDataService.setYear(year);
    }

    config: zingchart.graphset = {
        type: 'bar',
        plot: {
            'border-radius': '5px',
            valueBox: {
                text: '%stack-total',
                // backgroundColor: 'black',
                decimals: 0,
                fontSize: "20px"
            },
        },
        'scale-x': {
            label: { text: 'Months' },
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

    reloadData(): void {
        this.bankDataService.reloadData();
    }

    // TODO: bubble event or send to store selected month and react to that
    nodeClicked(ev): void {
        console.log(ev);
    }
}
