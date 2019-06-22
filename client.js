const wsProtocol = document.location.protocol.replace('http', 'ws');
const socket = new WebSocket(wsProtocol + '//' + document.location.host);

const messageEl = document.getElementById('message');
const responseEl = document.getElementById('response');
const errorsEl = document.getElementById('errors');

function sendMessage() {
  socket.send(messageEl.value);
}

socket.addEventListener('open', () => {
  console.log('WebSocket opened');
  sendMessage();
});

socket.addEventListener('message', event => {
  responseEl.innerText = event.data;
});

socket.addEventListener('error', err => {
  errorsEl.innerHtml += err + '\n';
});

socket.addEventListener('close', () => {
  console.log('WebSocket closed');
});

messageEl.oninput = sendMessage;
