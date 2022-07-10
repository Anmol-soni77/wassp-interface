const socket = io('https://wassp-app.herokuapp.com/');

const form = document.querySelector('form');
const inputmessage = document.getElementsByClassName('message');
const messagecontainer = document.querySelector('.container');  // It'll throw error if you use 'getElementsByClassName' instead of 'querySelector'
const inputelement = document.querySelector('input');
const sendbutton = document.querySelector('button');


const append = (message,position)=> {
    const messageelement = document.createElement('div');
    messageelement.innerHTML = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}

const naam= prompt("Enter Your name"); 

socket.emit('new-user-jonied', naam);

socket.on('user-joined',naam=>{
    append(`${naam} joined the chat`,'middle')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    message = inputelement.value;
    append(`you: ${message}`,'right')
    socket.emit('send',message)
    inputelement.value = '';
})

socket.on('recieve',data=>{
    append(`${data.username}:${data.message}`,'left')
})
socket.on('leftt',naam=>{
    append(`${naam} left the chat`,'middle')
});