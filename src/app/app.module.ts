import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ZingchartAngularModule } from 'zingchart-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinanceDataService } from './shared/financeDataService';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { VisualizationComponent } from './visualization-page/visualization/visualization.component';
import { AppRoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ZingchartAngularModule,
    NgxCsvParserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [FinanceDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
