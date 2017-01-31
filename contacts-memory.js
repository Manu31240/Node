/** Classe MemoryContacts */
const data = require('./contacts.json');

class MemoryContacts {
  constructor() {
    this.contacts = data.map(contact => new Contact(contact));
  }

  get(callback) {
    callback(this.contacts);
  }
}

module.exports = MemoryContacts;
