const db = require("../data/database");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattaedDAte = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    this.id = orderId;
  }

  save() {
    if (this.id) {
    } else {
      const orderDocument = {
        userData: this.userData,
        productDAta: this.productData,
        date: new Date(),
        status: this.status,
      };

      db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
