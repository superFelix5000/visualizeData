import { FelixDate } from "./felix-date";

export class BankDataEntry {
    postingDate: FelixDate;
    valueDate: FelixDate;
    paymentDate: FelixDate;
    amount: number;
    recipientOrPayer: string;
    accountNumber: number;
    bic: number;
    event: string;
    reference: string;
    payerReference: string;
    message: string;
    cardNumber: number;
    receipt: string;

    constructor(
        postingDate: FelixDate,
        valueDate: FelixDate,
        paymentDate: FelixDate,
        amount: number,
        recipientOrPayer: string,
        accountNumber: number,
        bic: number,
        event: string,
        reference: string,
        payerReference: string,
        message: string,
        cardNumber: number,
        receipt: string ){
            this.postingDate = postingDate;
            this.valueDate = valueDate;
            this.paymentDate = paymentDate;
            this.amount = amount;
            this.recipientOrPayer = recipientOrPayer;
            this.accountNumber = accountNumber;
            this.bic = bic;
            this.event = event;
            this.reference = reference;
            this.payerReference = payerReference;
            this.message = message;
            this.cardNumber = cardNumber;
            this.receipt = receipt;
        }
}