import { SimpleDate } from "./simple-date";
import { guid } from '@datorama/akita';
import { Category } from "./categories";

export class BankDataEntry {
    id: string;
    postingDate: SimpleDate;
    valueDate: SimpleDate;
    paymentDate: SimpleDate;
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
    category: Category;

    constructor(
        postingDate: SimpleDate,
        valueDate: SimpleDate,
        paymentDate: SimpleDate,
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
            this.id = guid();
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
            this.category = Category.OTHER;
        }
}