const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class User {
  constructor(name, email, descr, title, price) {
    this.name = name;
    this.email = email;
    this.descr = descr;
    this.title = title;
    this.price = price;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      descr: this.descr,
      title: this.title,
      price: this.price,
      id: this.id,
    };
  }

//   static async update(User) {
//     const notebooks = await User.getAll();

//     const idx = notebooks.findIndex((c) => c.id === User.id);
//     notebooks[idx] = User;

//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, "..", "data", "notebooks.json"),
//         JSON.stringify(notebooks),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

  async save() {
    const notebooks = await User.getAll();
    notebooks.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "db", "database.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "db", "database.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const notebooks = await User.getAll();
    return notebooks.find((c) => c.id === id);
  }
}

module.exports = User;
