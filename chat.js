function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// document.readyState(alert("Hello"));
//Chat Functions
const roomName = "room2";
const userName = "Umer";
var today = new Date();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const url = "127.0.0.1:8000";
const chatSocket = new WebSocket("ws://" + url + "/ws/chat/" + roomName + "/");

function handleChange(e) {
  debugger;
  console.log(e);
  var userChat =
    `<li class="chat-right">
  <div class="chat-hour">
    ` +
    time +
    ` 
  </div>
  <div class="chat-text">
   ` +
    e +
    `
  </div>
  <div class="chat-avatar">
    <div class="chat-name">` +
    userName +
    `</div>
  </div>
</li>`;
  document.getElementById("chatUl").innerHTML += userChat;
  document
    .getElementById("chatUl")
    .animate({ scrollTop: $("#mylist").prop("scrollHeight") }, 500);
  document.getElementById("messageData").value = "";

  // Chat Connection here

  const message = e;
  chatSocket.send(
    JSON.stringify({
      userName: userName,
      message: message,
    })
  );
}

chatSocket.onmessage = function (e) {
  debugger;
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const data = JSON.parse(e.data);
  console.log("Data is ", data);
  if (data.userName !== userName) {
    var otherUserChat =
      `<li class="chat-left">
    <div class="chat-avatar">
      <div class="chat-name">` +
      data.userName +
      `</div>
    </div>
    <div class="chat-text">
      ` +
      data.message +
      `
    </div>
    <div class="chat-hour">
     ` +
      time +
      `
    </div>
  </li>`;
    document.getElementById("chatUl").innerHTML += otherUserChat;
  } else {
    null;
  }
};
chatSocket.onclose = function (e) {
  console.error("Chat socket closed unexpectedly");
};

function sendData(id, room) {
  alert("Test ");
}
