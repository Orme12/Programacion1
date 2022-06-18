var moment = require ('moment');
moment.locale('es');

console.log('naci ' + moment('18/09/2000', 'DD/MM/YYYY').fromNow());