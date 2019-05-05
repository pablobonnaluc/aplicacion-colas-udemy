const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control.js');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    
    // Escuchar el cliente
    client.on('siguienteTicket', (data,callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
     
    });

    
    // emite evento 'estadoActual' 
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data,callback) => {

        if (!data.escritorio){
            return callback({
                err:true,
                mensaje:'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar notificar cambios en ultimos 4
         // emite evento 'ultimos4' 
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});