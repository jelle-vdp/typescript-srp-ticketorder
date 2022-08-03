import {EventReport} from "./types";

class Event {
    private _lineUp: string[];
    private _venue: string;
    private _date: Date;
    private _ticketPrice;
    private _discount: number;
    private _maxAmountOfTickets;
    private _amountOfTicketsBooked = 0;

    constructor(lineUp: string[], venue: string, date: Date, ticketPrice: number, discount: number, maxAmountOfTickets: number) {
        this._lineUp = lineUp;
        this._venue = venue;
        this._date = date;
        this._ticketPrice = ticketPrice;
        this._discount = discount;
        this._maxAmountOfTickets = maxAmountOfTickets;
    }

    get lineUp(): string[] {
        return this._lineUp;
    }

    get venue(): string {
        return this._venue;
    }

    get date(): Date {
        return this._date;
    }
    
    get ticketPrice(): number {
        return this._ticketPrice;
    }

    get discount(): number {
        return this._discount;
    }
    
    get maxAmountOfTickets(): number {
        return this._maxAmountOfTickets;
    }

    get amountOfTicketsBooked(): number {
        return this._amountOfTicketsBooked;
    }

    set amountOfTicketsBooked(amountOfTicketsBooked: number) {
        this._amountOfTicketsBooked = amountOfTicketsBooked;
    }
}

class CustomerService {
    public calculatePrice(numberOfTickets: number, event: Event): number {
        return (numberOfTickets * event.ticketPrice) * event.discount;
    }
}

class ReportGenerator {
    public generate(event: Event): EventReport {
        return {
            lineUp : event.lineUp,
            venue : event.venue,
            date : event.date,
            ticketPrice: event.ticketPrice,
            ticketsSold: event.amountOfTicketsBooked,
            totalRevenue: this.calculateTotalRevenue(event.amountOfTicketsBooked, event.ticketPrice),
            costs: this.calculateTotalCosts(event.amountOfTicketsBooked, event.ticketPrice, event.discount)
        };
    }

    private calculateTotalCosts(amountOfTickets: number, ticketPrice: number, discount: number): number {
        return amountOfTickets * ticketPrice * (1 - discount);
    }

    private calculateTotalRevenue(amountOfTickets: number, ticketPrice: number): number {
        return amountOfTickets * ticketPrice;
    }

    public sellTickets(numberOfTickets: number, event: Event): void {
        if (event.amountOfTicketsBooked + numberOfTickets > event.maxAmountOfTickets) {
            alert("Sorry, we can't sell you that many tickets");
        } else {
            event.amountOfTicketsBooked = event.amountOfTicketsBooked + numberOfTickets;
        }
    }
}

const event = new Event(["Viagra Boys", "Iceage"], "Het Bos", new Date(2022, 7, 23, 20, 30), 24, 0.5, 200);
const customerService = new CustomerService();
const reportGenerator = new ReportGenerator();


const eventInformation = <HTMLElement>document.getElementById("event-information");
const amountTicketsEl = <HTMLInputElement>document.getElementById("amount-tickets");
const buyTicketsBtn = <HTMLButtonElement>document.getElementById("order-submit");
const orderTarget = <HTMLElement>document.getElementById("order-target");

const eventBandsString = event.lineUp.map(band => band).join(" + ");

eventInformation.innerText = `${eventBandsString} at ${event.venue} on ${event.date.toLocaleDateString()}`;

buyTicketsBtn.addEventListener("click", () => {
    const amountTickets = parseInt(amountTicketsEl.value);
    if (event.amountOfTicketsBooked + amountTickets > event.maxAmountOfTickets) {
        alert(`You can't buy that much tickets, there are only: ${event.maxAmountOfTickets - event.amountOfTicketsBooked} tickets left`);
        return;
    } else {
        const price = customerService.calculatePrice(amountTickets, event);
        orderTarget.innerText = `You've bought ${amountTickets} tickets for ${eventBandsString} in ${event.venue}. The total price is: ${price}`;
        reportGenerator.sellTickets(amountTickets, event);
    }
})

const generateReportBtn = <HTMLButtonElement>document.getElementById("generate-report");
const reportTarget = <HTMLElement>document.getElementById("report-target");

generateReportBtn.addEventListener("click", () => {
    const report = reportGenerator.generate(event);
    const lineUp = report.lineUp.map(band => band).join(" + ");
    reportTarget.innerText = `${lineUp} in ${report.venue} on ${report.date.toLocaleDateString()}: total revenue: ${report.totalRevenue}, total costs: ${report.costs} & total tickets sold: ${report.ticketsSold}`;
});