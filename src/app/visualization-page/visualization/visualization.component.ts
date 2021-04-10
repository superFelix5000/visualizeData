import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { YEARS } from 'src/app/shared/constants';
import { BankDataQuery } from 'src/app/state/bank.data.query';
import { BankDataService } from 'src/app/state/bank.data.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

  years = YEARS;
  selectedYear: string;
  yearBalances$: Observable<number[]> = of([]);
  series: zingchart.series = null;

  constructor(private bankDataQuery: BankDataQuery,
              private bankDataService: BankDataService) {
  }
  ngOnInit(): void {
    this.bankDataService.init();

    this.yearBalances$ = this.bankDataQuery.selectYearBalances$;
    
    this.bankDataQuery.selectCurrentYear$
      .subscribe(year => this.selectedYear = year.toString());
    this.bankDataQuery.selectCurrentMonthValues$
      .subscribe(values => {
        this.series = [{values: values}];
      });
  }
  
  onYearSelectionChange(ev: MatSelectChange) {
    this.bankDataService.setYear(parseInt(ev.value));
  }

  config : zingchart.graphset = {
    title: {text: 'jee'},
    type: 'bar', 
    "scale-x": {
        label: { text: 'Months' },       
        values: [ 'January', 'Feb', 'March', 'April', 'May', 'JinitMapBalancesune', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  reloadData() {
    this.bankDataService.reloadData();
  }

}
