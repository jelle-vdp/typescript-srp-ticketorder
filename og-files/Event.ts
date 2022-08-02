import {EventReport} from "./types";

export default class Event {
    private _maxAmountOfTickets: number;
    private _amountOfTicketsBooked: number;
    private _ticketPrice: number;



    public calculatePrice(numberOfTickets: number): number{
        return (numberOfTickets * this._ticketPrice);
    }

    public createReport(): EventReport {
        return {
            ticketPrice: this._ticketPrice,
            ticketsSold: this._amountOfTicketsBooked,
            totalRevenue: this.calculateTotalRevenue()
        };
    }

    private calculateTotalRevenue() {
        return this.calculatePrice(this._amountOfTicketsBooked);
    }
}