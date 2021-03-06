export class BankDataEntry {
    postingDate: Date;
    valueDate: Date;
    paymentDate: Date;
    amount: Number;
    recipientOrPayer: string;
    accountNumber: Number;
    bic: Number;
    event: string;
    reference: string;
    payerReference: string;
    message: string;
    cardNumber: Number;
    receipt: string;

    constructor(
        postingDate: Date,
        valueDate: Date,
        paymentDate: Date,
        amount: Number,
        recipientOrPayer: string,
        accountNumber: Number,
        bic: Number,
        event: string,
        reference: string,
        payerReference: string,
        message: string,
        cardNumber: Number,
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