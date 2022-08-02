class Event {
    constructor() {
        this._ticketPrice = 22;
        this._discount = 0.5;
        this._maxAmountOfTickets = 100;
        this._amountOfTicketsBooked = 0;
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
            throw new Error("Too many tickets sold!");
        }
        else {
            event.amountOfTicketsBooked = event.amountOfTicketsBooked + numberOfTickets;
        }
    }
}
const event = new Event();
const customerService = new CustomerService();
const reportGenerator = new ReportGenerator();
const amountTicketsEl = document.getElementById("amount-tickets");
const buyTicketsBtn = document.getElementById("order-submit");
const orderTarget = document.getElementById("order-target");
buyTicketsBtn.addEventListener("click", () => {
    const amountTickets = parseInt(amountTicketsEl.value);
    const price = customerService.calculatePrice(amountTickets, event);
    orderTarget.innerText = `Total price: ${price}`;
    reportGenerator.sellTickets(amountTickets, event);
});
const generateReportBtn = document.getElementById("generate-report");
const reportTarget = document.getElementById("report-target");
generateReportBtn.addEventListener("click", () => {
    const report = reportGenerator.generate(event);
    reportTarget.innerText = `Total revenue: ${report.totalRevenue} / Total costs: ${report.costs} / Total tickets sold: ${report.ticketsSold}`;
});
