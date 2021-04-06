import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { YEARS } from './shared/constants';
import { FinanceDataService } from './shared/financeDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  years = YEARS;
  selectedYear: string = YEARS[YEARS.length - 1];
  yearBalances: number[] = [];
  series: zingchart.series = null;

  constructor(private financeDataService: FinanceDataService) {
    setTimeout(() => this.updateCharts(), 2000);
  }
  
  onYearSelectionChange(ev: MatSelectChange) {
    console.log(ev.value);
    this.selectedYear = ev.value;
    this.updateCharts();
  }

  config : zingchart.graphset = {
    title: {text: 'jee'},
    type: 'bar', 
    "scale-x": {
        label: { text: 'Months' },       
        values: [ 'January', 'Feb', 'March', 'April', 'May', 'JinitMapBalancesune', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  private updateCharts() {
    this.series = [{values: this.financeDataService.getMonthValues(this.selectedYear)}];
    this.yearBalances = this.financeDataService.getYearBalances();
  }

  reloadData() {
    this.financeDataService.reloadData();
  }
}
