import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stacked',
    templateUrl: './stacked.component.html',
    styleUrls: ['./stacked.component.scss']
})
export class StackedComponent implements OnInit {

    myConfig:zingchart.graphset = {
        type: "bar",
        plot: {
            stacked: true
        },
        series: [{
            values: [-20, 40, 25, 50, 15, 45, 33, 34],
            stack: 1
        },
        {
            values: [5, 30, 21, 18, 59, 50, 28, 33],
            stack: 1
        },
        {
            values: [30, 5, 18, 21, 33, 41, 29, 15],
            stack: 2
        }
        ]
    };

constructor() { }

ngOnInit(): void {
}

}
