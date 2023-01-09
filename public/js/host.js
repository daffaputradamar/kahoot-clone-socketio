var socket = io();
var params = jQuery.deparam(window.location.search);

//When host connects to server
socket.on('connect', function() {

    document.getElementById('players').innerHTML = "";
    
    //Tell server that it is host connection
    socket.emit('host-join', params);
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function(data){
    console.log(data);
    document.getElementById('players').innerHTML = "";

    for(var i = 0; i < data.length; i++){
        document.getElementById('players').innerHTML += `
            <div class="col-3 m-2 text-center" id="gameButton">
                ${data[i].name}
            </div>
        `;
    }
    
});

//Tell server to start game if button is clicked
function startGame(){
    socket.emit('startGame');
}
function endGame(){
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function(id){
    console.log('Game Started!');
    window.location.href="/host/game/" + "?id=" + id;
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Redirect user to 'join game' page
});

