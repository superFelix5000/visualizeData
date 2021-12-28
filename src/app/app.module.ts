import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ZingchartAngularModule } from 'zingchart-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { VisualizationComponent } from './visualization-page/visualization/visualization.component';
import { AppRoutingModule } from './routing/routing.module';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { EntryListPageComponent } from './entry-list-page/entry-list-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BankDataSortPipe } from './pipes/bank.data.sort.pipe';
import { UploadComponent } from './upload-page/upload-component/upload.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { PrintSimpleDatePipe } from './pipes/print.simple.date.pipe';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { EntryCategoryListComponent } from './entry-category-list/entry-category-list.component';

@NgModule({
    declarations: [
        AppComponent,
        VisualizationComponent,
        LandingPageComponent,
        EntryListComponent,
        EntryCategoryListComponent,
        EntryListPageComponent,
        BankDataSortPipe,
        PrintSimpleDatePipe,
        UploadComponent,
        PieChartComponent,
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
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
