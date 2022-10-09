import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryColorMap } from 'src/app/shared/category-colors';
import { CategoryPercentage } from 'src/app/shared/category-percentage';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { BankDataService } from 'src/app/state/bank.data.service';
import zingchart from 'zingchart/es6';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    series$: Observable<zingchart.series[]>;
    private categoryPercentages: CategoryPercentage[];
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

    constructor(private bankDataQuery: BankDataQuery,
                private bankDataService: BankDataService) {}

    ngOnInit(): void {
        this.series$ = this.bankDataQuery.selectAllCategoriesPerSelectedYearAndMonth$.pipe(
            map(values => values.sort((a,b) => a.category.toString().localeCompare(b.category.toString()))),
            tap(values => this.categoryPercentages = values),
            map(values => values.map(categoryPercentage => {
                return {
                    values: [categoryPercentage.totalValue],
                    text: categoryPercentage.category.toString(),
                    backgroundColor: CategoryColorMap.get(categoryPercentage.category)
                }
            })));
    }

    // TODO: add type for event?
    nodeClicked(ev) {
        this.bankDataService.setCategory(this.categoryPercentages[ev.plotindex].category);
    }
}
