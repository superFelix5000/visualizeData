import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { YEARS } from './shared/constants';
import { BankDataQuery } from './state/bank.data.query';
import { BankDataService } from './state/bank.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  years = YEARS;
  selectedYear: Observable<number>;
  yearBalances: Observable<number[]>;
  series: zingchart.series = null;

  constructor(private bankDataQuery: BankDataQuery,
              private bankDataService: BankDataService) {
    this.selectedYear = bankDataQuery.selectCurrentYear$;
    this.yearBalances = bankDataQuery.selectCurrentMonthValues$;
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
