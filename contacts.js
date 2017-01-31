const FileContacts = require('./contacts-file');


/** Classe Contacts, hérite de MemoryContacts */
class Contacts extends FileContacts {
  print() {
    console.log("print");
    this.get(contacts => console.log(contacts.join(', ')));
  }
}

module.exports = Contacts;
