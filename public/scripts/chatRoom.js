function retrieveChatRooms() {
  const httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = flow;

  httpRequest.open('GET', '/room', true);
  httpRequest.send();
}

function flow() {
  if(this.readyState == 4) {
    if(this.status == 200) {
      var board = document.getElementById("board");
      var response = JSON.parse(this.responseText)
      var roomName;
      var roomDescription;

      for(var i = 0; i < response.length; i++) {
        roomName = response[i].roomName;
        roomDescription = response[i].roomDescription;

        board.innerHTML  += "<div class='room'>" +
                               "<div class='room-name room-info'>" + roomName + "</div>" +
                               "<div class='room-description room-info'>" + roomDescription + "</div>" +
                            "</div>";
        if(i != 0 && i % 5 == 0) {
          board.innerHTML += "<br>";
        }
      }
    }
  }
}

retrieveChatRooms();
