

// Comando para establecer la comunicacion
var socket = io();

let lblNuevoTicket =  $('#lblNuevoTicket');

// Escchar sucesos
socket.on('connect', function(){
    
    console.log('Conectado al servidor');
    
});

socket.on('disconnect', function(){

    console.log('Se ha perdido la conexion con el servidor');

});

socket.on('estadoActual', function(data){

    lblNuevoTicket.text(data.actual);

});

$('button').on('click',function(){
    // Enviar informacion
        socket.emit('siguienteTicket',null, function(siguienteTicket){
            lblNuevoTicket.text(siguienteTicket);
        });

      
});