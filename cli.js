const yargs = require('yargs');

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
.command({
  command: 'serve',
  aliases: 's',
  desc: 'serve',
  handler : (argv) => {
    web(myContacts);


// Yargs est exécuté
yargs.parse(process.argv);

//module.require.init = function(myContacts);
