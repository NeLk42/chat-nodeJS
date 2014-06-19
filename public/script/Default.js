var socket;
$(document).ready(function(){
socket=io.connect(window.location.hostname);
socket.on('connect',addUser);
socket.on('updateChat',proceesMessage);
socket.on('updateUsers',updateUserList);
$('#dataSend').click(sendMessage);
$('#data').keypress(processEnterPress);
});
function processEnterPress(e){
if(e.which==13){
e.preventDefault();
$(this).blur();
$('#dataSend').focus().click();
}

}
function addUser(){
socket.emit('addUser',prompt('What\'s your name'));
}

function sendMessage(){
var message=$('#data').val();
socket.emit('sendChat',message);
$('#data').val('');
$('#data').focus();
}

function proceesMessage(username,data){
$('<b>'+username+':</b>'+data+'<br/>').insertAfter($('#conversation'));
}

function updateUserList(userNames){
$('#users').empty();
$.each(userNames,function(key,value){
$('#users').append('<div>'+key+'</div>');
})
}