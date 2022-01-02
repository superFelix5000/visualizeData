import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryColorMap } from 'src/app/shared/category-colors';
import { BankDataQuery } from 'src/app/state/bank.data.query';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    series$: Observable<zingchart.series[]>;
    myConfig: zingchart.graphset = {
        type: 'pie',
        plot: {
          valueBox: {
            placement: 'out',
            text: '%t\n%npv%',
            fontFamily: "Roboto"
          },
          tooltip: {
            fontSize: '18',
            fontFamily: "Roboto",
            padding: "5 10",
            text: "%t\n%npv%\n%v",
            decimals: 2
          }
        }
      };      

    constructor(private bankDataQuery: BankDataQuery) {}

    ngOnInit(): void {
        this.series$ = this.bankDataQuery.selectAllCategoriesPerSelectedYear$.pipe(
            map(values => values.sort((a,b) => a.category.toString().localeCompare(b.category.toString()))),
            map(values => values.map(categoryPercentage => {
                return {
                    values: [categoryPercentage.totalValue],
                    text: categoryPercentage.category.toString(),
                    backgroundColor: CategoryColorMap.get(categoryPercentage.category)
                }
            })));
    }
}
