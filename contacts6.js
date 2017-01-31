#!/usr/bin/env node
//version ES6
//const data = require('./contacts.json');

const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');
const path = './contacts.json';
const Contact = require('./contact.js');

/** Classe FileContacts */
class FileContacts {
  read(callback) {
    fs.readFile(path,function(err, data){
      if(err){
        console.error('pb');
      } else {
        const jsonData = JSON.parse(data);
        //console.log('jsonData', jsonData);
        const contacts = JSON.parse(data).map(contact => new Contact(contact));
        if(!!callback){
          callback(contacts);
        }
      }
      })
  }
  get(callback){
    this.read(callback);
  }
  write (contacts, callback){
    const contactsString = JSON.stringify(contacts);
    fs.writeFile(path, contactsString, callback);

  }
  add (firstName, lastName, callback){
    this.read(function(contacts){
      const maxId = _.chain(contacts)
      .sortBy(function(c){return c.id;})
      .last()
      .value()
      .id;
      const newContact = new Contact({
        id : maxId + 1,
        firstName : firstName,
        lastName : lastName
      });
      console.log(newContact);
      contacts.push(newContact);
      //ecrire les contacts maj dans le fichier
      this.write(contacts, callback);
    }.bind(this));
  }
  delete (callback){

  }

}




/** Classe MemoryContacts */
/*class MemoryContacts {
  constructor() {
    this.contacts = data.map(contact => new Contact(contact));
  }
  get(callback) {
    callback(this.contacts);
  }
}
$/
/** Classe Contacts, hérite de MemoryContacts */
class Contacts extends FileContacts {
  print() {
    this.get(contacts => console.log(contacts.join(', ')));
  }
}

/* Instanciation de 'Contacts' */
const myContacts = new Contacts();

/* Parsing yargs */

yargs
  .version('0.0.0')
  // Ajout d'une option 'c' -> colors
  .option('c', {
    alias: 'colors',
    desc: 'Use colors in console'
  })
  .help()
  // L'option 'c' est une option globale (elle fonctionne pour toutes les commandes)
  .global('c')

yargs
  // Définition d'une commande list qui appelle 'myContacts.print()'
  .command({
    command: 'list',
    aliases: 'ls',
    desc: 'List all contacts',
    handler: () => myContacts.print(),
  })
  // Définition d'une commande list qui ajoute un contact
  .command({
    command: 'add',
    aliases: 'a',
    desc: 'add contacts',
    builder: (yrgs) => {
      yrgs
      .option('firstName', {
        alias : 'f',
        desc: 'first Name',
        demande : true,
        type: 'string'
      })
      .option('lastName', {
        alias : 'l',
        desc: 'last Name',
        demande : true,
        type: 'string'
      })
    },
    handler : (argv) => {
      myContacts.add(argv.firstName, argv.lastName);
    },
})

// Yargs est exécuté
yargs.parse(process.argv);
