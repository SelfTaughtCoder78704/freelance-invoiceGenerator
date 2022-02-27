class Invoice {
  constructor(
    invoiceNumber,
    dateIssued,
    dueDate,
    bizName,
    bizAddress,
    bizEmail,
    bizWebsite,
    customerName,
    customerEmail,
    productsOrServices
  ) {
    this.invoiceNumber = invoiceNumber;
    this.dateIssued = dateIssued;
    this.dueDate = dueDate;
    this.bizName = bizName;
    this.bizAddress = bizAddress;
    this.bizEmail = bizEmail;
    this.bizWebsite = bizWebsite;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.productsOrServices = productsOrServices;
    this.subTotal = 0;
    this.discounts = [];
    this.invoiceTotal = 0;
    this.invoiceTotalWithTax = 0;
  }

  // GET TOTAL
  getInvoiceTotal() {
    for (let i = 0; i < this.productsOrServices.length; i++) {
      this.invoiceTotal += this.productsOrServices[i].lineTotal;
    }
    return this.invoiceTotal;
  }

  // GET SUBTOTAL
  getSubTotal() {
    for (let i = 0; i < this.productsOrServices.length; i++) {
      this.subTotal += this.productsOrServices[i].lineTotal;
    }
    return this.subTotal;
  }

  // GIVE DISCOUNT
  giveDiscount(discount, name) {
    this.discounts.push({
      name: name,
      discount: discount,
    });
    this.invoiceTotal -= discount;
  }

  // CALCULATE TAX and round down to nearest cent
  calculateTax(taxRate) {
    this.invoiceTotalWithTax = this.invoiceTotal * (1 + taxRate);
    this.invoiceTotalWithTax = Math.floor(this.invoiceTotalWithTax * 100) / 100;
  }

  // CREATE LINE ITEMS
  createServiceProduct(name, price, quantity) {
    this.productsOrServices.push({
      name: name,
      price: price,
      quantity: quantity,
      lineTotal: price * quantity,
    });
  }

  // DELETE LINE ITEMS AND Recalculate Subtotal, Total, and Total With Tax
  deleteServiceProduct(name) {
    for (let i = 0; i < this.productsOrServices.length; i++) {
      if (this.productsOrServices[i].name === name) {
        this.productsOrServices.splice(i, 1);
        this.subTotal -= this.productsOrServices[i].lineTotal;
        this.invoiceTotal -= this.productsOrServices[i].lineTotal;
        this.invoiceTotalWithTax -= this.productsOrServices[i].lineTotal;
      }
    }
  }

  // UPDATE DUE DATE
  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
}

// BASE NUMBER FOR INVOICE NUMBER
let baseInvoiceNumber = 0;

// CREATE INVOICE NUMBER
const generatInvoiceNumber = () => {
  baseInvoiceNumber++;
  return baseInvoiceNumber;
};

// FORMATTING THE INVOICE NUMBER
const formatInvoiceNumber = (invoiceNumber) => {
  return "INV-0000" + invoiceNumber;
};

// SET THE DATE ISSUED
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// SET DUE DATE
const increaseDate = (date, number) => {
  date.setDate(date.getDate() + number);
  return formatDate(date);
};

module.exports = {
  generatInvoiceNumber,
  formatInvoiceNumber,
  formatDate,
  increaseDate,
  Invoice,
};
