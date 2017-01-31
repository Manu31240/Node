#!/usr/bin/env node
//const data = require('./contacts.json');

const Contacts = require('./contacts');
const cli = require('./cli');


/* Instanciation de 'Contacts' */
const myContacts = new Contacts();

cli.init(myContacts);
