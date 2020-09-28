const EventEmitter = require('events'); 
class Emissor extends EventEmitter {

}

const emissor = new Emissor(); 
const evento = "usuario:click"; 
emissor.on(evento, (event) => {
    console.debug('Aí, ', event); 
})

process.openStdin().addListener('data', value => {
    console.info(`Voce digitou: ${value.toString().trim().toUpperCase()}`); 
}) 