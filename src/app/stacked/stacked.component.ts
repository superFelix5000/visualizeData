import { Component, OnInit } from '@angular/core';
import { BankDataQuery } from '../state/bank.data.query';
import { Category } from 'src/app/shared/categories';
import { CategoryColorMap } from 'src/app/shared/category-colors';
import { filter } from 'rxjs';

@Component({
    selector: 'app-stacked',
    templateUrl: './stacked.component.html',
    styleUrls: ['./stacked.component.scss']
})
export class StackedComponent implements OnInit {

    series: zingchart.series[];
    myConfig: zingchart.graphset = {
        type: "bar",
        plot: {
            stacked: true,
            tooltip: {
                fontSize: '18',
                fontFamily: "Roboto",
                padding: "5 10",
                text: "%t\n%v",
                decimals: 2
              }
        },        
        'scale-x': {
            values: [
                'January',
                'February',
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

    constructor(private bankDataQuery: BankDataQuery) { }

    ngOnInit(): void {        
        this.bankDataQuery.selectAllEntriesPerSelectedYear$
            .pipe(filter(entries => entries.length > 0))
            .subscribe(entries => {
                let series: {}[] = [];
                for(let key in Category) {
                    let monthValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let i = 0; i < 12; i++) {
                        monthValues[i] = entries
                            .filter(entry => entry.paymentDate.month === i+1)
                            .filter(entry => entry.category === Category[key])
                            .map(entry => entry.amount)
                            .reduce((a,b) => a + b, 0);
                    }
                    series.push({
                        values: monthValues,
                        backgroundColor: CategoryColorMap.get(Category[key]),
                        text: key
                    });
                }
                this.series = series;
        });             
    }

}
