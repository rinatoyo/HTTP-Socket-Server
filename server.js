const net = require("net");
const files = require("./files.js");

var today = new Date();

const PORT = 8080;

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    // read incoming data
    console.log("Hello. You are connected.");
    console.log("data");
    console.log(chunk.toString());

    // parse the string
    let storeString = chunk.toString();
    console.log("stored string: " + storeString);
    let splitString = storeString.split(" ");
    console.log("split string at 1: ", splitString[1]);

    // grab the right file
    let index1 = splitString[1];
    let respHead;
    switch (index1) {
      case "/index.html":
        respHead = `HTTP/1.1 200 OK
Server: cat/0.0.7 (Ubuntu)
Date: ${today}
Content-Type: text/html; charset=utf-8 
Content-Length:${files.index.length}
Connection: keep-alive

${files.index}`;
        break;

      case "/helium.html":
        respHead = `HTTP/1.1 200 OK
Server: cat/0.0.7 (Ubuntu)
Date: ${today}
Content-Type: text/html; charset=utf-8 
Content-Length:${files.helium.length}
Connection: keep-alive

${files.helium}`;
        break;

      case "/404.html":
        respHead = `HTTP/1.1 404 Not Found
Server: cat/0.0.7 (Ubuntu)
Date: ${today}
Content-Type: text/html; charset=utf-8 
Content-Length:${files.four04.length}
Connection: keep-alive

${files.four04}`;
        break;

      case "/styles.css":
        respHead = `HTTP/1.1 200 OK
Server: cat/0.0.7 (Ubuntu)
Date: ${today}
Content-Type: text/css; charset=utf-8 
Content-Length:${files.styles.length}
Connection: keep-alive

${files.styles}`;
        break;
    }

    // write outgoing data
    socket.write(respHead);
    socket.end();
  });

  socket.on("end", () => {
    // handle client disconnect
    console.log("You are disconnected. Goodbye.");
  });

  socket.on("error", err => {
    // handle error in connection
    throw err;
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
