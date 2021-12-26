import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
            fontFamily: "Open Sans"
          },
          tooltip: {
            fontSize: '18',
            fontFamily: "Open Sans",
            padding: "5 10",
            text: "%npv%"
          }
        }
      };
      /*
      series = [{
        values: [11.38],
        text: "Internet Explorer",
        backgroundColor: '#50ADF5',
      },
      {
        values: [56.94],
        text: "Chrome",
        backgroundColor: '#FF7965',
      },
      {
        values: [14.52],
        text: 'Firefox',
        backgroundColor: '#FFCB45',
      },
      {
        text: 'Safari',
        values: [9.69],
        backgroundColor: '#6877e5'
      },
      {
        text: 'Other',
        values: [7.48],
        backgroundColor: '#6FB07F'
      }
    ];*/

    constructor(private bankDataQuery: BankDataQuery) {}

    ngOnInit(): void {
        this.series$ = this.bankDataQuery.selectAllCategoriesPerSelectedYear$.pipe(
            map(values => values.map(categoryPercentage => {
                return {
                    values: [categoryPercentage.percentage],
                    text: categoryPercentage.category.toString()
                }
            })));
    }
}
