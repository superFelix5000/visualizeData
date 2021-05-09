import { ThrowStmt } from "@angular/compiler";

export class SimpleDate {

    day: number;
    month: number;
    year: number;

    constructor(day: number, month: number, year: number) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    toString(): string {
        return this.day.toString() + '.' + this.month.toString() + '.' + this.year.toString();
    }

}