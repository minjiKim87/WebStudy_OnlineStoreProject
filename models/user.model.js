const db = require("../data/database");

const bcrypt = require("bcryptjs");

class User {
  constructor(email, passowrd, fullname, street, postal, city) {
    this.email = email;
    this.passowrd = passowrd;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.passowrd, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      passowrd: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
