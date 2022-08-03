class Event {
    constructor(lineUp, venue, date, ticketPrice, discount, maxAmountOfTickets) {
        this._amountOfTicketsBooked = 0;
        this._lineUp = lineUp;
        this._venue = venue;
        this._date = date;
        this._ticketPrice = ticketPrice;
        this._discount = discount;
        this._maxAmountOfTickets = maxAmountOfTickets;
    }
    get lineUp() {
        return this._lineUp;
    }
    get venue() {
        return this._venue;
    }
    get date() {
        return this._date;
    }
    get ticketPrice() {
        return this._ticketPrice;
    }
    get discount() {
        return this._discount;
    }
    get maxAmountOfTickets() {
        return this._maxAmountOfTickets;
    }
    get amountOfTicketsBooked() {
        return this._amountOfTicketsBooked;
    }
    set amountOfTicketsBooked(amountOfTicketsBooked) {
        this._amountOfTicketsBooked = amountOfTicketsBooked;
    }
}
class CustomerService {
    calculatePrice(numberOfTickets, event) {
        return (numberOfTickets * event.ticketPrice) * event.discount;
    }
}
class ReportGenerator {
    generate(event) {
        return {
            lineUp: event.lineUp,
            venue: event.venue,
            date: event.date,
            ticketPrice: event.ticketPrice,
            ticketsSold: event.amountOfTicketsBooked,
            totalRevenue: this.calculateTotalRevenue(event.amountOfTicketsBooked, event.ticketPrice),
            costs: this.calculateTotalCosts(event.amountOfTicketsBooked, event.ticketPrice, event.discount)
        };
    }
    calculateTotalCosts(amountOfTickets, ticketPrice, discount) {
        return amountOfTickets * ticketPrice * (1 - discount);
    }
    calculateTotalRevenue(amountOfTickets, ticketPrice) {
        return amountOfTickets * ticketPrice;
    }
    sellTickets(numberOfTickets, event) {
        if (event.amountOfTicketsBooked + numberOfTickets > event.maxAmountOfTickets) {
            alert("Sorry, we can't sell you that many tickets");
        }
        else {
            event.amountOfTicketsBooked = event.amountOfTicketsBooked + numberOfTickets;
        }
    }
}
const event = new Event(["Viagra Boys", "Iceage"], "Het Bos", new Date(2022, 7, 23, 20, 30), 24, 0.5, 200);
const customerService = new CustomerService();
const reportGenerator = new ReportGenerator();
const eventInformation = document.getElementById("event-information");
const amountTicketsEl = document.getElementById("amount-tickets");
const buyTicketsBtn = document.getElementById("order-submit");
const orderTarget = document.getElementById("order-target");
const eventBandsString = event.lineUp.map(band => band).join(" + ");
eventInformation.innerText = `${eventBandsString} at ${event.venue} on ${event.date.toLocaleDateString()}`;
buyTicketsBtn.addEventListener("click", () => {
    const amountTickets = parseInt(amountTicketsEl.value);
    if (event.amountOfTicketsBooked + amountTickets > event.maxAmountOfTickets) {
        alert(`You can't buy that much tickets, there are only: ${event.maxAmountOfTickets - event.amountOfTicketsBooked} tickets left`);
        return;
    }
    else {
        const price = customerService.calculatePrice(amountTickets, event);
        orderTarget.innerText = `You've bought ${amountTickets} tickets for ${eventBandsString} in ${event.venue}. The total price is: ${price}`;
        reportGenerator.sellTickets(amountTickets, event);
    }
});
const generateReportBtn = document.getElementById("generate-report");
const reportTarget = document.getElementById("report-target");
generateReportBtn.addEventListener("click", () => {
    const report = reportGenerator.generate(event);
    const lineUp = report.lineUp.map(band => band).join(" + ");
    reportTarget.innerText = `${lineUp} in ${report.venue} on ${report.date.toLocaleDateString()}: total revenue: ${report.totalRevenue}, total costs: ${report.costs} & total tickets sold: ${report.ticketsSold}`;
});
export {};
