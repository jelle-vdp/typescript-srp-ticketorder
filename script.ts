import {EventReport} from "./types";

class Event {
    private _ticketPrice: number = 22;
    private _discount: number = 0.5;
    private _maxAmountOfTickets: number = 100;
    private _amountOfTicketsBooked: number = 0;

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
    public calculatePrice(numberOfTickets: number, event: Event): number{
        return (numberOfTickets * event.ticketPrice) * event.discount;
    }
}

class ReportGenerator {
    public generate(event: Event): EventReport {
        return {
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
            throw new Error("Too many tickets sold!");
        } else {
            event.amountOfTicketsBooked = event.amountOfTicketsBooked + numberOfTickets;
        }
    }
}

const event = new Event();
const customerService = new CustomerService();
const reportGenerator = new ReportGenerator();

const amountTicketsEl = <HTMLInputElement>document.getElementById("amount-tickets");
const buyTicketsBtn = <HTMLButtonElement>document.getElementById("order-submit");
const orderTarget = <HTMLElement>document.getElementById("order-target");

buyTicketsBtn.addEventListener("click", () => {
    const amountTickets = parseInt(amountTicketsEl.value);
    const price = customerService.calculatePrice(amountTickets, event);
    orderTarget.innerText = `Total price: ${price}`;
    reportGenerator.sellTickets(amountTickets, event);
})

const generateReportBtn = <HTMLButtonElement>document.getElementById("generate-report");
const reportTarget = <HTMLElement>document.getElementById("report-target");

generateReportBtn.addEventListener("click", () => {
    const report = reportGenerator.generate(event);
    reportTarget.innerText = `Total revenue: ${report.totalRevenue} / Total costs: ${report.costs} / Total tickets sold: ${report.ticketsSold}`;
});