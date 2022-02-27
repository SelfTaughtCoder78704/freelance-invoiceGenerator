const {
  Invoice,
  generatInvoiceNumber,
  formatInvoiceNumber,
  formatDate,
  increaseDate,
} = require("./invoice");

// bring in nodemailer
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   auth: {
//     user: "bobbynicholson78704@gmail.com",
//     pass: "abahhntalgekyztp",
//   },
// });

// get command line arguments
const [, , ...args] = process.argv;
console.log(args[0]);

if (args[0] === "example") {
  console.log("");
  console.log("Pass in the following arguments:");
  console.log("");
  console.log("1. Days until due date");
  console.log("2. Business name");
  console.log("3. Business address");
  console.log("4. Business email");
  console.log("5. Business website");
  console.log("6. Customer name");
  console.log("7. Customer email");
  console.log("");
  console.log("*****  Use double quotes for strings with spaces  ******");
  console.log("");
  return;
}

let invoice = new Invoice(
  formatInvoiceNumber(generatInvoiceNumber()),
  formatDate(new Date()),
  increaseDate(new Date(), Number(args[0]) || 7), // days to add
  args[1] || "Business Name", // business name
  args[2] || "Business Address", // business address
  args[3] || "Business Email", // business email
  args[4] || "Business Website", // business website
  args[5] || "Customer Name", // customer name
  args[6] || "Customer Email", // customer email
  []
);

// STEPS TO CREATE INVOICE
invoice.createServiceProduct("Product1", 10, 2);
invoice.createServiceProduct("Product2", 20, 1);
invoice.getInvoiceTotal();
invoice.getSubTotal();
invoice.giveDiscount(2.45, "loyalty discount");
invoice.calculateTax(0.0825);
console.log(invoice);
invoice.deleteServiceProduct("Product1");
invoice.updateDueDate(increaseDate(new Date(), 3));
console.log(invoice);

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// const HTMLTemplate = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// </head>
// <style>
//  p {
//    line-height: 0.33;
//  }
// </style>
// <body>
//  <div>
//   <h1>${invoice.bizName} Invoice:</h1>
//   <p>${invoice.bizAddress}</p>
//   <p>${invoice.bizEmail}</p>
//   <p>${invoice.bizWebsite}</p>
//   <p>Customer Name: ${invoice.customerName}</p>
//   <p>Customer Email: ${invoice.customerEmail}</p>
//  </div>
//   <div>${invoice.productsOrServices.map(
//     (product) => `
//     <h2>Product/Service Name:${product.name}</h2>
//     <p>Price: ${product.price}</p>
//     <p>Quantity: ${product.quantity}</p>
//     <h3>Line Total: $${product.lineTotal}</h3>
//   `
//   )}</div>
//   <div>
//     <p>Subtotal: $${invoice.subTotal}</p>
//   </div>
//   <div>${invoice.discounts.map(
//     (discount) => `
//     <p>Discount Name:<b>${discount.name}</b></p>
//     <h3>Discount: $${discount.discount}</h3>
//   `
//   )}</div>
//   <div>
//     <p>Total: $${invoice.invoiceTotal}</p>
//     <h3>Total With Tax: $${invoice.invoiceTotalWithTax}</h3>
//   </div>
// </body>
// </html>
// `;

// transporter.sendMail({
//   from: "bobbynicholson78704@gmail.com", // sender address
//   to: "bobbynicholson78704@gmail.com", // list of receivers
//   subject: "Invoice Ready ✔", // Subject line
//   html: HTMLTemplate, // html body
// });
