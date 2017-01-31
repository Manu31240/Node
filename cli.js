const yargs = require('yargs');
const web = require("./web");

//              module.exports.init = function(myContacts)
//equivaut à => module.exports = { init: function(myContacts)}
// require(cli).init();

//module.exports = function init(myContacts)
// require(cli)();

module.exports.init = function(myContacts){
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
      handler: (argv) => {
        myContacts.print()
      },
    })
    .command({
      command: 'add',
      aliases: 'a',
      desc: 'Add contact',
      builder: (yrgs) => {
        yrgs
        .option('firstName', {
          alias: 'f',
          desc: 'first name',
          demand: true,
          type: 'string'
        })
        .option('lastName', {
          alias: 'l',
          desc: 'last name',
          demand: true,
          type: 'string'
        })
        .option('address', {
          alias: 'a',
          desc: 'Address',
          demand: true,
          type: 'string'
        })
        .option('phone', {
          alias: 'p',
          desc: 'Phone number',
          demand: true,
          type: 'string'
        })
      },
      handler: (argv) => {
        myContacts.add(argv.firstName, argv.lastName, argv.address, argv.phone);
      }
      })
      .command({
        command: 'delete',
        aliases: 'd',
        desc: 'Delete contact',
        builder: (yrgs) => {
          yrgs
          .option('id', {
            alias: 'i',
            desc: 'identifier',
            demand: true,
            type: 'number'
          })
        },
        handler: (argv) => {
          myContacts.delete(argv.id);
        }
      })
      .command({
        command: 'watch',
        aliases: 'w',
        desc: 'Watch contacts',
        handler: (argv) => {
          myContacts.watch();
        }
      })
      .command({
        command: 'serve',
        aliases: 's',
        desc: 'Launch server',
        handler: (argv) => {
          web(myContacts);
        }
      })


  // Yargs est exécuté
  yargs.parse(process.argv);
}
