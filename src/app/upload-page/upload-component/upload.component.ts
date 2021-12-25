import { Component } from '@angular/core';
import { BankDataService } from 'src/app/state/bank.data.service';

@Component({
    selector: 'app-upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

    constructor(private bankDataService: BankDataService){}

    onFileInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const file: File = target.files[0];
        file.text().then((text) => {
            const entries = this.bankDataService.readBankDataEntriesFromData(text);
        });
    }

}
