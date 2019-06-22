const socket = new WebSocket(window.location.origin.replace('http', 'ws') +
                             window.location.pathname);

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
