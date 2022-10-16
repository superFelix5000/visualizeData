    import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
    import { filter, map, tap } from 'rxjs/operators';
    import { CategoryColorMap } from 'src/app/shared/category-colors';
    import { CategoryPercentage } from 'src/app/shared/category-percentage';
    import { BankDataQuery } from 'src/app/state/bank.data.query';
    import { BankDataService } from 'src/app/state/bank.data.service';
    import { Chart, registerables } from 'chart.js';

    @Component({
        selector: 'app-pie-chart',
        templateUrl: './pie-chart.component.html',
        styleUrls: ['./pie-chart.component.scss'],
    })
    export class PieChartComponent implements OnInit {
        @ViewChild('canvas', {static: true}) myCanvas: ElementRef<HTMLCanvasElement>;

        private categoryPercentages: CategoryPercentage[];           
        private myChart: Chart;

        constructor(private bankDataQuery: BankDataQuery,
                    private bankDataService: BankDataService) {
            Chart.register(...registerables);
        }

        ngOnInit(): void {
            const labels = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ];

            this.myChart = new Chart(this.myCanvas.nativeElement.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: [],
                        backgroundColor: [],
                        hoverOffset: 4
                    }]
                },
                options: {
                    interaction: {
                        mode: 'index'
                    }
                }
            });

            this.bankDataQuery.selectAllCategoriesPerSelectedYearAndMonth$.pipe(
                filter(values => values.length > 0),
                map(values => values.sort((a,b) => a.category.toString().localeCompare(b.category.toString())))
            ).subscribe(values => {
                var labels: string[] = [];
                var colors: string[] = [];
                var dataPoints: number[] = [];
                this.categoryPercentages = [];

                values.map(
                    categoryPercentage => {
                        this.categoryPercentages.push(categoryPercentage);
                        labels.push(categoryPercentage.category.toString());
                        colors.push(CategoryColorMap.get(categoryPercentage.category));
                        dataPoints.push(categoryPercentage.totalValue);
                    }
                );

                this.myChart.data = {
                    labels: labels,
                    datasets: [{
                        data: dataPoints,
                        backgroundColor: colors,
                        hoverOffset: 4
                    }]
                };
                this.myChart.update();
            });
        }

        // TODO: add type for event?
        onChartClick(e) {
            const items = this.myChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
            if (items && items.length == 1) {
                this.bankDataService.setCategory(this.categoryPercentages[items[0].index].category);
            }            
        }
    }
