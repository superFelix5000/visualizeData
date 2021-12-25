import { BankDataEntry } from "../shared/bank-data-entry";

export type ServerData = {
    success: boolean;
    data: BankDataEntry[];
};